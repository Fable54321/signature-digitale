import { createContext } from "react";



type activeSessionType = {
    arrival_time: Date;
    full_name: string;
    company_name: string;
    visit_reason: string;
}

type fullSessionType = activeSessionType & {
    departure_time: Date;
    arrival_signature_url: string;
    departure_signature_url: string;

}


type VisitorsContextType = {
    startVisitorSession: () => void;
    endVisitorSession: () => void;
    getActiveSession: () => void;
    activeSession: activeSessionType | null;
    setActiveSession: React.Dispatch<React.SetStateAction<number | null>>;
    getFullSession: () => void;
    fullSession: fullSessionType | null;
};

export const VisitorsContext = createContext<VisitorsContextType>({} as VisitorsContextType);