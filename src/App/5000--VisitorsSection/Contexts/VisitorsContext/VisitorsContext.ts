import { createContext } from "react";



export type activeSessionType = {
    arrival_time: string;
    full_name: string;
    company_name: string;
    visit_reason: string;
}

export type fullSessionType = activeSessionType & {
    departure_time: Date;
    arrival_signature_url: string;
    departure_signature_url: string;

}

export type CheckBoxType = {
    isAuthorizedArea: boolean;
      isRestrictedArea: boolean;
      isWashingHands: boolean;
      isNoManipulation: boolean,
      isAppropriateWear: boolean,
      isCleanShoes: boolean,
}

export type ActiveSessionPayload = activeSessionType & {
    full_name: string;
    company_name: string;
    visit_reason: string;
    signatureDataUrl: string;
    checklist: CheckBoxType;
}
export type SignatureResponse ={
    key: string;
    url: string;
}


type VisitorsContextType = { 
    startVisitorSession: (payload: ActiveSessionPayload) => Promise<void>;
    endVisitorSession: () => void;
    getActiveSession: () => activeSessionType | null;
    activeSession: activeSessionType | null;
    setActiveSession: React.Dispatch<React.SetStateAction<activeSessionType | null>>;
    getFullSession: () => fullSessionType | null;
    fullSession: fullSessionType | null;
    startVisitorSessionLoading: boolean;
    setStartVisitorSessionLoading: React.Dispatch<React.SetStateAction<boolean>>;
    sessionSubmissionSuccess: boolean;
    setSessionSubmissionSuccess: React.Dispatch<React.SetStateAction<boolean>>;

};

export const VisitorsContext = createContext<VisitorsContextType | undefined>(undefined);