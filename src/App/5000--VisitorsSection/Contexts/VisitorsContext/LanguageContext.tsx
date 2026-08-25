import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { visitorTranslations, type VisitorTranslations } from "./VisitorTranslations";

export type VisitorLanguage = "fr" | "es" | "en";

type LanguageContextValue = {
  language: VisitorLanguage;
  setLanguage: (language: VisitorLanguage) => void;
  text: VisitorTranslations;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<VisitorLanguage>("fr");
  const value = useMemo(
    () => ({ language, setLanguage, text: visitorTranslations[language] }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
