import { useCallback, useState } from "react";
import { fetchWithAuth } from "../../Utils/fetchWithAuth";
import { VisitorsContext, type activeSessionType, type fullSessionType } from "./VisitorsContext";


type Props = {
    children: React.ReactNode;
};





export const VisitorsProvider = ({ children }: Props) => {

    const [startVisitorSessionLoading, setStartVisitorSessionLoading] = useState(false);
    const [activeSession, setActiveSession] = useState<activeSessionType | null>(null);
    const [fullSession, setFullSession] = useState<fullSessionType | null>(null);


     const startVisitorSession = useCallback(async (payload: activeSessionType) => {

         if (!payload) return;

       try {

         setStartVisitorSessionLoading(true);

          await fetchWithAuth(`/visitors/start`, {
           method: "POST",
           body: JSON.stringify(payload),
         });

         setStartVisitorSessionLoading(false);

       } catch (error) {
         console.error(error);
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
                setStartVisitorSessionLoading
            }}
        >
            {children}
        </VisitorsContext.Provider>
    )
};