import { useCallback, useState } from "react";
import { fetchWithAuth } from "../../Utils/fetchWithAuth";
import { 
    VisitorsContext, 
    type ActiveSessionPayload, 
    type ActiveVisitType,
    type activeSessionType, 
    type fullSessionType,
type SignatureResponse } from "./VisitorsContext";


type Props = {
    children: React.ReactNode;
};





export const VisitorsProvider = ({ children }: Props) => {

    const [startVisitorSessionLoading, setStartVisitorSessionLoading] = useState(false);
    const [activeVisitsLoading, setActiveVisitsLoading] = useState(false);
    const [activeSession, setActiveSession] = useState<activeSessionType | null>(null);
    const [activeVisits, setActiveVisits] = useState<ActiveVisitType[]>([]);
    const [fullSession, setFullSession] = useState<fullSessionType | null>(null);
    const [activeVisitsError, setActiveVisitsError] = useState<string | null>(null);
  
    const [sessionSubmissionSuccess, setSessionSubmissionSuccess] = useState(false);


   const startVisitorSession = useCallback(async (payload: ActiveSessionPayload) => {
  if (!payload) return;

  try {
    setStartVisitorSessionLoading(true);
    setSessionSubmissionSuccess(false);

  

    let arrival_signature_key = payload.signatureDataUrl;

    
    if (payload.signatureDataUrl?.startsWith("data:image")) {
    const signatureData = await fetchWithAuth<SignatureResponse>(`/visitors/signature`, {
  method: "POST",
  body: {
    signatureDataUrl: payload.signatureDataUrl,
  },

  

});


      if (!signatureData) {
        throw new Error("Erreur upload signature");
      }

      

      arrival_signature_key = signatureData.key;
    }

  
   const createdSession = await fetchWithAuth<activeSessionType>(`/visitors/start`, {
  method: "POST",
  body: {
    ...payload,
    arrival_signature_key,
  },
});


    if (!createdSession) {
      throw new Error("Erreur création visiteur");
    }

    setActiveSession(createdSession);
    setSessionSubmissionSuccess(true);

    setTimeout(() => {
      location.replace(`/visiteurs`);
    }, 2000);
  } catch (error) {
    console.error(error);
  } finally {
    setStartVisitorSessionLoading(false);
  }
}, []);

     const fetchActiveVisits = useCallback(async () => {
         try {
             setActiveVisitsLoading(true);
             setActiveVisitsError(null);

             const visits = await fetchWithAuth<ActiveVisitType[]>("/visitors/active");

             setActiveVisits(visits);
         } catch (error) {
             console.error(error);
             setActiveVisitsError("Impossible de charger les visites actives.");
         } finally {
             setActiveVisitsLoading(false);
         }
     }, []);

     const endVisitorSession = useCallback(() => {
         setActiveSession(null);
         setFullSession(null);
     }, []);

     const getActiveSession = useCallback(() => {
         return activeSession;
     }, [activeSession]);

     const getFullSession = useCallback(() => {
         return fullSession;
     }, [fullSession]);






    return (
        <VisitorsContext.Provider 
            value={{
                startVisitorSession, 
                endVisitorSession,
                getActiveSession,
                activeSession,
                setActiveSession,
                activeVisits,
                fetchActiveVisits,
                activeVisitsLoading,
                activeVisitsError,
                getFullSession,
                fullSession,
                startVisitorSessionLoading, 
                setStartVisitorSessionLoading,
                sessionSubmissionSuccess,
                setSessionSubmissionSuccess,
            }}
        >
            {children}
        </VisitorsContext.Provider>
    )
};
