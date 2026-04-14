import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
  
  type ReactNode,
} from "react";



import axios from "axios";

export type Worker = {
  user_id: number;
  username: string;
  name: string;
  surname: string;
  email: string | null;
  birth_date: string;
  residence_country: string;
  phone_number: string;
  job_title: string;
  job_description: string;
  hourly_wage: number | string;
  debut_date: string;
  job_duration: string;
  approximative_daily_hours: number;
  approximative_weekly_hours: number;
  pin: string;
  is_connected: boolean;
  contract_type: string;
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
  generateContractPdf: (pinToUse?: string) => Promise<boolean>;
  clearWorker: () => void;
  clearPdf: () => void;
  disconnect: () => void;
  getCurrentWorker: () => Promise<boolean>;
  currentContractId: number;
  setCurrentContractId: React.Dispatch<React.SetStateAction<number>>;
  signContract: SignContract;
  setError: React.Dispatch<React.SetStateAction<string>>;
  isPinError: boolean;
  contracts: SessionContract[];
setContracts: React.Dispatch<React.SetStateAction<SessionContract[]>>;
currentIndex: number;
setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
currentContract: SessionContract | null;
 
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
  const [currentContractId, setCurrentContractId] = useState<number>(0);
  const [contracts, setContracts] = useState<SessionContract[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prefetchedPdfBlobsRef = useRef<Map<number, string>>(new Map());
  
const currentContract = useMemo(
  () => contracts[currentIndex] ?? null,
  [contracts, currentIndex]
);

const ensureContractAccess = useCallback(
  async (contractId: number) => {
    const target = contracts.find((c) => c.contractId === contractId);

    if (!target) {
      return null;
    }

    if (target.accessUrl) {
      return target.accessUrl;
    }

    try {
      const res = await axios.get(
        `${baseUrl}/signature/foreign-worker-contract/${contractId}/access`
      );

      const accessUrl = res.data.accessUrl;

      if (!accessUrl) {
        throw new Error("URL d'accès manquante");
      }

      setContracts((prev) =>
        prev.map((contract) =>
          contract.contractId === contractId
            ? { ...contract, accessUrl }
            : contract
        )
      );

      return accessUrl;
    } catch (err) {
      console.error("Erreur lors de la récupération de l'accès au contrat:", err);
      setError("Erreur lors de la récupération du PDF");
      return null;
    }
  },
  [contracts]
);

const prefetchContractFile = useCallback(
  async (contractId: number) => {
    if (prefetchedPdfBlobsRef.current.has(contractId)) {
      return prefetchedPdfBlobsRef.current.get(contractId) ?? null;
    }

    const target = contracts.find((c) => c.contractId === contractId);

    if (!target) {
      return null;
    }

    let accessUrl = target.accessUrl;

    if (!accessUrl) {
      accessUrl = await ensureContractAccess(contractId);
    }

    if (!accessUrl) {
      return null;
    }

    try {
      const response = await fetch(accessUrl);

      if (!response.ok) {
        throw new Error("Impossible de précharger le PDF");
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      prefetchedPdfBlobsRef.current.set(contractId, blobUrl);

      return blobUrl;
    } catch (err) {
      console.error("Erreur lors du préchargement du PDF:", err);
      return null;
    }
  },
  [contracts, ensureContractAccess]
);

useEffect(() => {
  if (!currentContract) return;

  void ensureContractAccess(currentContract.contractId);
}, [currentContract, ensureContractAccess]);

useEffect(() => {
  if (!currentContract) {
    setPdfUrl(null);
    return;
  }

  const blobUrl = prefetchedPdfBlobsRef.current.get(currentContract.contractId);

  if (blobUrl) {
    setPdfUrl(blobUrl);
    return;
  }

  setPdfUrl(currentContract.accessUrl ?? null);
}, [currentContract]);


const nextContract = useMemo(
  () => contracts[currentIndex + 1] ?? null,
  [contracts, currentIndex]
);

useEffect(() => {
  if (!nextContract) return;
  if (nextContract.accessUrl) return;

  void ensureContractAccess(nextContract.contractId);
}, [nextContract, ensureContractAccess]);

useEffect(() => {
  if (!nextContract) return;

  void prefetchContractFile(nextContract.contractId);
}, [nextContract, prefetchContractFile]);

useEffect(() => {
  const blobs = prefetchedPdfBlobsRef.current;

  return () => {
    blobs.forEach((blobUrl) => {
      URL.revokeObjectURL(blobUrl);
    });

    blobs.clear();
  };
}, []);

  const clearPdf = useCallback(() => {
    setPdfUrl(null);
  }, []);

  const clearWorker = useCallback(() => {
    setWorker(null);
    setError("");
    setPin("");
    clearPdf();
  }, [clearPdf]);

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

      await new Promise((resolve) =>
        requestAnimationFrame(() => resolve(null))
      );
      setPin("");
      location.replace("/");
     
      return true;
    } catch (err) {
      console.error("Error during disconnect:", err);
      setLoading(false);
      return false;
    }
  },
  [pin]
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

        await axios.post(
          `${baseUrl}/signature/foreign-worker-info/by-pin`,
          {
            pin: finalPin,
          }
        );

        return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(
          err.response?.data?.error ||
            "Erreur lors de la connexion"
        );

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




  const getCurrentWorker = useCallback((async () => {
    try {
      setLoading(true);
      setError("");
      setWorker(null);

      const res = await axios.get(
        `${baseUrl}/signature/foreign-worker-info/current`,
      );

      setWorker(res.data.worker);
      return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setWorker(null);
      setError(
        err.response?.data?.error ||
          "Erreur lors de la récupération des informations"
      );

      

      
      


      
      return false;
    } finally {
      setLoading(false);
    }


  }), [])

const generateContractPdf = useCallback(
  async (pinToUse?: string) => {
    const finalPin = pinToUse ?? pin;

    if (!finalPin) {
      setError("Veuillez entrer votre PIN");
      return false;
    }

    try {
      setPdfLoading(true);
      setError("");

      const res = await axios.post(
        `${baseUrl}/signature/foreign-worker-contract/session/by-pin`,
        {
          pin: finalPin,
        }
      );

      const { contracts: sessionContracts, currentIndex: sessionCurrentIndex } = res.data;

      if (!Array.isArray(sessionContracts) || sessionContracts.length === 0) {
        throw new Error("Aucun contrat retourné");
      }

      setContracts(sessionContracts);
      setCurrentIndex(
        typeof sessionCurrentIndex === "number" && sessionCurrentIndex >= 0
          ? sessionCurrentIndex
          : 0
      );

      return true;
    } catch (err) {
      console.error("Erreur lors de la préparation des contrats:", err);
      setError("Erreur lors de la préparation des contrats");
      return false;
    } finally {
      setPdfLoading(false);
    }
  },
  [pin, setContracts, setCurrentIndex]
);


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

      const updatedContracts = contracts.map((contract) =>
        contract.contractId === contractId
          ? { ...contract, status: "signed" as const }
          : contract
      );

      setContracts(updatedContracts);

      const nextUnsignedIndex = updatedContracts.findIndex(
        (contract) => contract.status !== "signed"
      );

      if (nextUnsignedIndex >= 0) {
        setCurrentIndex(nextUnsignedIndex);
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
  [contracts]
);
 

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
    generateContractPdf,
    clearWorker,
    clearPdf,
    disconnect,
    getCurrentWorker,
    currentContractId,
    setCurrentContractId,
    signContract,
    setError,
    isPinError,
    contracts,
    setContracts,
    currentIndex,
    setCurrentIndex,
    currentContract,
  }),
  [
    pin,
    worker,
    loading,
    pdfLoading,
    error,
    pdfUrl,
    lookupByPin,
    generateContractPdf,
    clearWorker,
    clearPdf,
    disconnect,
    getCurrentWorker,
    currentContractId,
    setCurrentContractId,
    signContract,
    setError,
    isPinError,
    contracts,
    setContracts,
    currentIndex,
    setCurrentIndex,
    currentContract,
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