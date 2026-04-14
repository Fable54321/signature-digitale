import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";

export type Worker = {
  userId: number;
  name: string;
  surname: string;
  contractType: string | null;
  pin: string | null;
  birth_date: string | null;
};

type SessionContract = {
  contractId: number;
  slug: string;
  title: string;
  status: "draft" | "signed";
  templateVersion: string | null;
  accessUrl: string | null;
  isReady: boolean;
  reused: boolean;
};

type SignContractParams = {
  contractId: number;
  signatureDataUrl: string;
  acceptedTerms: boolean;
  signedName: string;
};

type SignContract = (params: SignContractParams) => Promise<boolean>;

type ForeignWorkerContextType = {
  pin: string;
  setPin: React.Dispatch<React.SetStateAction<string>>;
  worker: Worker | null;
  loading: boolean;
  pdfLoading: boolean;
  error: string;
  pdfUrl: string | null;
  lookupByPin: (pinToLookup?: string) => Promise<boolean>;
  startContractSession: (pinToUse?: string) => Promise<boolean>;
  generateContractPdf: (pinToUse?: string) => Promise<boolean>;
  clearWorker: () => void;
  clearPdf: () => void;
  disconnect: (pinToUse?: string) => Promise<boolean>;
  signContract: SignContract;
  setError: React.Dispatch<React.SetStateAction<string>>;
  isPinError: boolean;
  contracts: SessionContract[];
  setContracts: React.Dispatch<React.SetStateAction<SessionContract[]>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  currentContract: SessionContract | null;
  currentContractId: number;
};

const ForeignWorkerContext = createContext<ForeignWorkerContextType | undefined>(
  undefined
);

const baseUrl = import.meta.env.VITE_API_URL;

export const ForeignWorkerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [pin, setPin] = useState("");
  const [isPinError, setIsPinError] = useState(false);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [contracts, setContracts] = useState<SessionContract[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const contractsRef = useRef<SessionContract[]>([]);
  const blobUrlsRef = useRef<Map<number, string>>(new Map());
  const accessRequestsRef = useRef<Map<number, Promise<string | null>>>(new Map());
  const blobRequestsRef = useRef<Map<number, Promise<string | null>>>(new Map());
  const activeDisplayedContractRef = useRef<number | null>(null);

  useEffect(() => {
    contractsRef.current = contracts;
  }, [contracts]);

  const currentContract = useMemo(() => {
    return contracts[currentIndex] ?? null;
  }, [contracts, currentIndex]);

  const currentContractId = useMemo(() => {
    return currentContract?.contractId ?? 0;
  }, [currentContract]);

  const nextContract = useMemo(() => {
    return contracts[currentIndex + 1] ?? null;
  }, [contracts, currentIndex]);

  const previousContract = useMemo(() => {
    return currentIndex > 0 ? contracts[currentIndex - 1] ?? null : null;
  }, [contracts, currentIndex]);

  const revokeBlobUrl = useCallback((contractId: number) => {
    const existing = blobUrlsRef.current.get(contractId);
    if (existing) {
      URL.revokeObjectURL(existing);
      blobUrlsRef.current.delete(contractId);
    }
  }, []);

  const trimBlobCache = useCallback((allowedIds: number[]) => {
    const allowed = new Set(
      allowedIds.filter((id): id is number => Number.isInteger(id) && id > 0)
    );

    for (const [contractId, blobUrl] of blobUrlsRef.current.entries()) {
      if (!allowed.has(contractId)) {
        URL.revokeObjectURL(blobUrl);
        blobUrlsRef.current.delete(contractId);
      }
    }
  }, []);

  const updateContractAccessUrl = useCallback((contractId: number, accessUrl: string) => {
    setContracts((prev) =>
      prev.map((contract) =>
        contract.contractId === contractId ? { ...contract, accessUrl } : contract
      )
    );
  }, []);

  const ensureContractAccess = useCallback(
    async (contractId: number): Promise<string | null> => {
      const existingContract = contractsRef.current.find(
        (contract) => contract.contractId === contractId
      );

      if (!existingContract) {
        return null;
      }

      if (existingContract.accessUrl) {
        return existingContract.accessUrl;
      }

      const inFlightRequest = accessRequestsRef.current.get(contractId);
      if (inFlightRequest) {
        return inFlightRequest;
      }

      const requestPromise = (async () => {
        try {
          const res = await axios.get(
            `${baseUrl}/signature/foreign-worker-contract/${contractId}/access`
          );

          const accessUrl = res.data?.accessUrl;

          if (!accessUrl || typeof accessUrl !== "string") {
            throw new Error("URL d'accès manquante");
          }

          updateContractAccessUrl(contractId, accessUrl);
          return accessUrl;
        } catch (err) {
          console.error("Erreur lors de la récupération de l'accès au contrat:", err);
          setError("Erreur lors de la récupération du PDF");
          return null;
        } finally {
          accessRequestsRef.current.delete(contractId);
        }
      })();

      accessRequestsRef.current.set(contractId, requestPromise);
      return requestPromise;
    },
    [updateContractAccessUrl]
  );

  const ensureContractBlobUrl = useCallback(
    async (contractId: number): Promise<string | null> => {
      const existingBlobUrl = blobUrlsRef.current.get(contractId);
      if (existingBlobUrl) {
        return existingBlobUrl;
      }

      const inFlightRequest = blobRequestsRef.current.get(contractId);
      if (inFlightRequest) {
        return inFlightRequest;
      }

      const requestPromise = (async () => {
        try {
          const accessUrl = await ensureContractAccess(contractId);

          if (!accessUrl) {
            return null;
          }

          const response = await fetch(accessUrl);

          if (!response.ok) {
            throw new Error("Impossible de télécharger le PDF");
          }

          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);

          const oldBlobUrl = blobUrlsRef.current.get(contractId);
          if (oldBlobUrl && oldBlobUrl !== blobUrl) {
            URL.revokeObjectURL(oldBlobUrl);
          }

          blobUrlsRef.current.set(contractId, blobUrl);
          return blobUrl;
        } catch (err) {
          console.error("Erreur lors du préchargement du PDF:", err);
          return null;
        } finally {
          blobRequestsRef.current.delete(contractId);
        }
      })();

      blobRequestsRef.current.set(contractId, requestPromise);
      return requestPromise;
    },
    [ensureContractAccess]
  );

  const setDisplayedPdfForContract = useCallback(
    async (contractId: number) => {
      activeDisplayedContractRef.current = contractId;

      const existingBlobUrl = blobUrlsRef.current.get(contractId);
      if (existingBlobUrl) {
        if (activeDisplayedContractRef.current === contractId) {
          setPdfUrl(existingBlobUrl);
        }
        return;
      }

      const accessUrl = await ensureContractAccess(contractId);

      if (
        accessUrl &&
        activeDisplayedContractRef.current === contractId &&
        !blobUrlsRef.current.has(contractId)
      ) {
        setPdfUrl(accessUrl);
      }

      const downloadedBlobUrl = await ensureContractBlobUrl(contractId);

      if (
        downloadedBlobUrl &&
        activeDisplayedContractRef.current === contractId
      ) {
        setPdfUrl(downloadedBlobUrl);
      }
    },
    [ensureContractAccess, ensureContractBlobUrl]
  );

  useEffect(() => {
    if (!currentContract) {
      activeDisplayedContractRef.current = null;
      setPdfUrl(null);
      return;
    }

    void setDisplayedPdfForContract(currentContract.contractId);

    trimBlobCache([
      currentContract.contractId,
      nextContract?.contractId ?? -1,
      previousContract?.contractId ?? -1,
    ]);
  }, [
    currentContract,
    nextContract,
    previousContract,
    setDisplayedPdfForContract,
    trimBlobCache,
  ]);

  useEffect(() => {
    if (!nextContract) return;
    void ensureContractBlobUrl(nextContract.contractId);
  }, [nextContract, ensureContractBlobUrl]);

  const clearPdf = useCallback(() => {
    activeDisplayedContractRef.current = null;
    setPdfUrl(null);
  }, []);

  const resetContractState = useCallback(() => {
    setContracts([]);
    setCurrentIndex(0);
    setPdfUrl(null);
    activeDisplayedContractRef.current = null;

    accessRequestsRef.current.clear();
    blobRequestsRef.current.clear();

    for (const blobUrl of blobUrlsRef.current.values()) {
      URL.revokeObjectURL(blobUrl);
    }
    blobUrlsRef.current.clear();
  }, []);

  const clearWorker = useCallback(() => {
    setWorker(null);
    setError("");
    setPin("");
    setIsPinError(false);
    clearPdf();
    resetContractState();
  }, [clearPdf, resetContractState]);

  const disconnect = useCallback(
    async (pinToUse?: string) => {
      const finalPin = pinToUse ?? pin;

      if (!finalPin) {
        setError("Veuillez entrer votre PIN");
        return false;
      }

      try {
        setLoading(true);

        await axios.post(`${baseUrl}/signature/foreign-worker-info/disconnect`, {
          pin: finalPin,
        });

        clearWorker();

        await new Promise((resolve) => {
          requestAnimationFrame(() => resolve(null));
        });

        location.replace("/");
        return true;
      } catch (err) {
        console.error("Error during disconnect:", err);
        setLoading(false);
        return false;
      }
    },
    [pin, clearWorker]
  );

  const lookupByPin = useCallback(
    async (pinToLookup?: string) => {
      const finalPin = pinToLookup ?? pin;

      if (!finalPin) {
        setError("Veuillez entrer votre PIN");
        return false;
      }

      try {
        setLoading(true);
        setError("");
        setIsPinError(false);

        await axios.post(`${baseUrl}/signature/foreign-worker-info/by-pin`, {
          pin: finalPin,
        });

        return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.response?.data?.error || "Erreur lors de la connexion");
        setIsPinError(true);

        setTimeout(() => {
          location.replace("/");
        }, 1100);

        return false;
      } finally {
        setLoading(false);
      }
    },
    [pin]
  );

  const startContractSession = useCallback(
    async (pinToUse?: string) => {
      const finalPin = pinToUse ?? pin;

      if (!finalPin) {
        setError("Veuillez entrer votre PIN");
        return false;
      }

      try {
        setPdfLoading(true);
        setError("");
        setIsPinError(false);

        resetContractState();

        const res = await axios.post(
          `${baseUrl}/signature/foreign-worker-contract/session/by-pin`,
          { pin: finalPin }
        );

        const {
          worker: sessionWorker,
          contracts: sessionContracts,
          currentIndex: sessionCurrentIndex,
        } = res.data;

        if (!Array.isArray(sessionContracts) || sessionContracts.length === 0) {
          throw new Error("Aucun contrat retourné");
        }

        if (sessionWorker) {
          setWorker({
            userId: sessionWorker.userId,
            name: sessionWorker.name,
            surname: sessionWorker.surname,
            contractType: sessionWorker.contractType ?? null,
            pin: sessionWorker.pin?.toString?.() ?? finalPin,
            birth_date: sessionWorker.birth_date ?? null,
          });

          setPin(sessionWorker.pin?.toString?.() ?? finalPin);
        } else {
          setPin(finalPin);
        }

        setContracts(sessionContracts);
        setCurrentIndex(
          typeof sessionCurrentIndex === "number" && sessionCurrentIndex >= 0
            ? sessionCurrentIndex
            : 0
        );

        return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Erreur lors de la préparation des contrats:", err);
        setError(
          err.response?.data?.error || "Erreur lors de la préparation des contrats"
        );
        return false;
      } finally {
        setPdfLoading(false);
      }
    },
    [pin, resetContractState]
  );

  const generateContractPdf = startContractSession;

 const signContract = useCallback<SignContract>(
  async ({
    contractId,
    signatureDataUrl,
    acceptedTerms,
    signedName,
  }) => {
    if (!contractId) {
      setError("Contrat introuvable");
      return false;
    }

    if (!acceptedTerms) {
      setError("Vous devez accepter le contrat avant de signer");
      return false;
    }

    if (!signatureDataUrl) {
      setError("Veuillez ajouter votre signature");
      return false;
    }

    try {
      setPdfLoading(true);
      setError("");

      await axios.post(
        `${baseUrl}/signature/foreign-worker-contract/${contractId}/sign`,
        {
          signatureDataUrl,
          acceptedTerms,
          signedName,
        }
      );

      const currentContracts = contractsRef.current;

      const updatedContracts = currentContracts.map((contract) =>
        contract.contractId === contractId
          ? {
              ...contract,
              status: "signed" as const,
              accessUrl: null,
            }
          : contract
      );

      const nextUnsignedIndex = updatedContracts.findIndex(
        (contract) => contract.status !== "signed"
      );

      setContracts(updatedContracts);

      revokeBlobUrl(contractId);

      if (nextUnsignedIndex >= 0) {
        setCurrentIndex(nextUnsignedIndex);
      } else {
        setPdfUrl(null);
      }

      return true;
    } catch (err) {
      console.error("Erreur lors de la signature du contrat:", err);
      setError("Erreur lors de la signature du contrat");
      return false;
    } finally {
      setPdfLoading(false);
    }
  },
  [revokeBlobUrl]
);

  useEffect(() => {
    const accessRequests = accessRequestsRef.current;
    const blobRequests = blobRequestsRef.current;
    const blobUrls = blobUrlsRef.current;

    return () => {
      accessRequests.clear();
      blobRequests.clear();

      for (const url of blobUrls.values()) {
        URL.revokeObjectURL(url);
      }
      blobUrls.clear();
    };
  }, []);

  const value = useMemo(
    () => ({
      pin,
      setPin,
      worker,
      loading,
      pdfLoading,
      error,
      pdfUrl,
      lookupByPin,
      startContractSession,
      generateContractPdf,
      clearWorker,
      clearPdf,
      disconnect,
      signContract,
      setError,
      isPinError,
      contracts,
      setContracts,
      currentIndex,
      setCurrentIndex,
      currentContract,
      currentContractId,
    }),
    [
      pin,
      worker,
      loading,
      pdfLoading,
      error,
      pdfUrl,
      lookupByPin,
      startContractSession,
      generateContractPdf,
      clearWorker,
      clearPdf,
      disconnect,
      signContract,
      isPinError,
      contracts,
      currentIndex,
      currentContract,
      currentContractId,
    ]
  );

  return (
    <ForeignWorkerContext.Provider value={value}>
      {children}
    </ForeignWorkerContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useForeignWorker = () => {
  const context = useContext(ForeignWorkerContext);

  if (!context) {
    throw new Error(
      "useForeignWorker must be used within a ForeignWorkerProvider"
    );
  }

  return context;
};