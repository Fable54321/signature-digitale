import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
 
  
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
  pin: number;
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
  generateContractPdf: (pinToUse?: string, contractSlug?: string) => Promise<boolean>;
  clearWorker: () => void;
  clearPdf: () => void;
  disconnect: () => void;
  getCurrentWorker: () => Promise<boolean>;
  currentContractId: number;
  setCurrentContractId: React.Dispatch<React.SetStateAction<number>>;
  signContract: SignContract;
  setError: React.Dispatch<React.SetStateAction<string>>;
  contract: number;
  setContract: React.Dispatch<React.SetStateAction<number>>;
  isPinError: boolean;
 
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
  const [contract, setContract] = useState<number>(11);
  


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
        return false;
      } finally {
        setLoading(false);
      }
    },
    [pin]
  );

  useEffect(() => {
  return () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
  };
}, [pdfUrl]);


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
  async (pinToUse?: string, contractSlug?: string) => {
    const finalPin = pinToUse ?? pin;

    if (!finalPin) {
      setError("Veuillez entrer votre PIN");
      return false;
    }

    try {
      setPdfLoading(true);
      setError("");

      const createRes = await axios.post(
        `${baseUrl}/signature/foreign-worker-contract/by-pin`,
        {
          pin: finalPin,
          contractSlug,
        }
      );

      const { contractId } = createRes.data;

      if (!contractId) {
        throw new Error("contractId manquant");
      }

      const urlRes = await axios.get(
        `${baseUrl}/signature/foreign-worker-contract/${contractId}/url`
      );

      const { url } = urlRes.data;

      if (!url) {
        throw new Error("URL signée manquante");
      }

      setCurrentContractId(contractId);
      setPdfUrl(url);

      return contractId;
    } catch (err) {
      console.error("Erreur lors de la génération/récupération du PDF:", err);
      setError("Erreur lors de la génération du PDF");
      setIsPinError(true);

      setTimeout(() => {
        setIsPinError(false);
        location.replace("/");
      }, 1500);
       
      return false;
    } finally {
      setPdfLoading(false);
    }
  },
  [pin]
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

      const urlRes = await axios.get(
        `${baseUrl}/signature/foreign-worker-contract/${contractId}/url`
      );

      const { url } = urlRes.data;

      if (!url) {
        throw new Error("URL signée manquante");
      }

      setPdfUrl(url);

       

      return true;
    } catch (err) {
      console.error("Erreur lors de la signature du contrat:", err);
      setError("Erreur lors de la signature du contrat");
      return false;
    } finally {
      setPdfLoading(false);
    }
  },
  []
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
      contract,
      setContract,
      isPinError
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
      contract,
      setContract,
      isPinError
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