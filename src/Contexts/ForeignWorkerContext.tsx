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

type Worker = {
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
};

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
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const clearPdf = useCallback(() => {
    setPdfUrl((prev) => {
      if (prev) {
        URL.revokeObjectURL(prev);
      }
      return null;
    });
  }, []);

  const clearWorker = useCallback(() => {
    setWorker(null);
    setError("");
    setPin("");
    clearPdf();
  }, [clearPdf]);

  const lookupByPin = useCallback(
    async (pinToLookup?: string) => {
      const finalPin = pinToLookup ?? pin;

      if (!finalPin) {
        setError("Veuillez entrer votre PIN");
        setWorker(null);
        return false;
      }

      try {
        setLoading(true);
        setError("");
        setWorker(null);

        const res = await axios.post(
          `${baseUrl}/signature/foreign-worker-info/by-pin`,
          {
            pin: finalPin,
          }
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
    },
    [pin]
  );

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

        setPdfUrl((prev) => {
          if (prev) {
            URL.revokeObjectURL(prev);
          }
          return null;
        });

        const res = await axios.post(
          `${baseUrl}/signature/foreign-worker-contract/by-pin`,
          {
            pin: finalPin,
          },
          {
            responseType: "blob",
          }
        );

        const blob = new Blob([res.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        setPdfUrl(url);
        return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError("Erreur lors de la génération du PDF");
        return false;
      } finally {
        setPdfLoading(false);
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