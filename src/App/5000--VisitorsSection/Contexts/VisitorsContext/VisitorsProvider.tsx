import { useCallback, useState } from "react";
import { fetchWithAuth } from "../../Utils/fetchWithAuth";
import { 
    VisitorsContext, 
    type ActiveSessionPayload, 
    type activeSessionType, 
    type fullSessionType,
type SignatureResponse } from "./VisitorsContext";


type Props = {
    children: React.ReactNode;
};





export const VisitorsProvider = ({ children }: Props) => {

    const [startVisitorSessionLoading, setStartVisitorSessionLoading] = useState(false);
    const [activeSession, setActiveSession] = useState<activeSessionType | null>(null);
    const [fullSession, setFullSession] = useState<fullSessionType | null>(null);
    const [token, setToken] = useState<string>("");


   const startVisitorSession = useCallback(async (payload: ActiveSessionPayload) => {
  if (!payload) return;

  try {
    setStartVisitorSessionLoading(true);

  

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

    alert("infos de visite enregistrées avec succès")

    setActiveSession(createdSession);
    location.replace(`/visiteurs`);
  } catch (error) {
    console.error(error);
  } finally {
    setStartVisitorSessionLoading(false);
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
                getFullSession,
                fullSession,
                startVisitorSessionLoading, 
                setStartVisitorSessionLoading,
                token,
                setToken
            }}
        >
            {children}
        </VisitorsContext.Provider>
    )
};