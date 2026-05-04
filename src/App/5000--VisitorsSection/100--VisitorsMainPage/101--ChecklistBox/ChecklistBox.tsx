import { useEffect, useMemo, useState } from "react";
import { rules } from "../../Utils/Rules";
import { Check, UserRound } from "lucide-react";
import { scrollToBottom } from "../../../../Utils/scrollToBottom";
import VisitorsSignatureBlock from "../../Components/VisitorsSignatureBlock";
import { useVisitors } from "../../Contexts/VisitorsContext/UseVisitors";
import VisitorInfo from "../../Components/VisitorInfo";
import Spinner from "../../../../Components/Spinner";




type ChecklistKey = keyof typeof rules;
type ChecklistState = Record<ChecklistKey, boolean>;




const ChecklistBox = () => {

 
    const [checklist, setChecklist] = useState<ChecklistState>({
      "isAuthorizedArea": false,
      "isRestrictedArea": false,
      "isWashingHands": false,
      "isNoManipulation": false,
      "isAppropriateWear": false,
      "isCleanShoes": false,
    
    });

    const { startVisitorSession, startVisitorSessionLoading } = useVisitors();




    const [fullName, setFullName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [visitReason, setVisitReason] = useState("");
    const [email, setEmail] = useState("");
    const [visitorCategory, setVisitorCategory] = useState("");

    const [isOtherChecked, setIsOtherChecked] = useState(false);
    const [isUnderstandingChecked, setIsUnderstandingChecked] = useState(false);
    const [otherContent, setOtherContent] = useState("");
    const [currentDate, setCurrentDate] = useState(new Date());

    const [isInfoCompleted, setIsInfoCompleted] = useState(false);

    const isAllChecked = useMemo(() => {
      return Object.values(checklist).every((value) => value);
    }, [checklist]);

    const API_BASE_URL = import.meta.env.VITE_API_URL || '';

    useEffect(()=> { console.log(isAllChecked) },[isAllChecked, checklist])

    useEffect(()=> {
      if(isUnderstandingChecked) {
        scrollToBottom();
      }
    },[isUnderstandingChecked])

    useEffect(() => {
      setTimeout(() => {
        setCurrentDate(new Date());
      }, 1000);
    },[currentDate]);

const [planHref, setPlanHref] = useState<string | null>(null);

const shouldShowVisitorFlow =  !startVisitorSessionLoading ;

useEffect(() => {
  let ignore = false;

  const fetchVisitorPlanUrl = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/visitors/plan-url`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Impossible de générer le lien du plan.");
      }

      const data = await response.json();

      if (!ignore && data?.url) {
        setPlanHref(data.url);
      }
    } catch (error) {
      console.error("Erreur chargement plan du site:", error);
    }
  };

  fetchVisitorPlanUrl();

  return () => {
    ignore = true;
  };
}, [API_BASE_URL]);

    




const handleSubmit = async (signatureDataUrl: string) => {

  if(!isAllChecked){
    alert("Veuillez lire et accepter tous les termes.");
    return;
  }


 const payload = {
  arrival_time: new Date().toISOString(),
  full_name: fullName,
  company_name: companyName,
  visit_reason: visitReason,
  signatureDataUrl: signatureDataUrl,
  url: planHref,
  checklist,
  other_content: otherContent,
  email,
};

  await startVisitorSession(payload);
};

if(startVisitorSessionLoading){
  return (
    <Spinner />
  )
}
   


  return (

    <section className="border bg-white border-gray-200 mt-4 w-[min(98%,800px)] py-2 px-2  flex flex-col gap-3 shadow-2xl rounded-xl ">
      
      <div className=" flex items-center gap-5 bg-[#f4f6ee] rounded-xl">
        <div className="bg-secondary p-1 rounded-full">
        <UserRound className="w-full text-tertiary" size={35} />
        </div>
        <h2 className="w-full text-[1.8em] font-primary text-secondary font-bold  pb-2 pt-2  border-primary">
          
          {
        isInfoCompleted ? "Politique pour les visiteurs" : "Informations du visiteur" 
       
        }</h2>
      </div>
       


     {shouldShowVisitorFlow && !isInfoCompleted && <VisitorInfo 
     fullName={fullName} 
     currentDate={currentDate} 
     setFullName={setFullName} 
     companyName={companyName} 
     setCompanyName={setCompanyName} 
     visitReason={visitReason} 
     setVisitReason={setVisitReason} 
     setIsInfoCompleted={setIsInfoCompleted}
     email={email}
     setEmail={setEmail}
     visitorCategory={visitorCategory}
     setVisitorCategory={setVisitorCategory}
     url={planHref} />} 
      {shouldShowVisitorFlow && (
         <form action="" className="px-4">
         
        {isInfoCompleted && <div className="flex flex-col gap-4 text-[1.3em] mt-2">
          <p className="text-center text-[1.2em]">J'accepte les conditions suivantes :</p>
        {(Object.entries(checklist) as Array<[ChecklistKey, boolean]>).map(([key, value]) => (
          <div key={key} className="relative flex items-center  pt-1  ">
            
            <p className="text-[1.3em] mr-6 pb-3 border-b-3 border-primary border-l pl-10 rounded-b-xl shadow-lg w-full" >{rules[key]}</p>

            <label className={`mr-0 ml-auto w-20 h-20 rounded-xl  shadow-[0_4px_6px_rgba(0,0,0,0.1)] border border-gray-300 hover:cursor-pointer flex justify-center items-center ${value ? "bg-secondary" : "bg-white"}`} htmlFor={`rule-${key}`}>
              {value && <Check className="text-white" size={30} />}
            </label>
            <input
            id={`rule-${key}`}
              type="checkbox"
              checked={value}
              onChange={(e) => {
                setChecklist((prev) => ({
                  ...prev,
                  [key]: e.target.checked,
                }));
              }}
              className="hidden"
            />
            
          </div>
          
        ))}
        <div className="w-full flex items-center gap-3">
        <label className="flex flex-col items-center gap-2 w-full text-[1.3em]">
          Autre (précisez): 
          <textarea value={otherContent} onChange={(e) => setOtherContent(e.target.value)}  className="p-2 border-t-0 border-r-0  flex-1 w-full text-[1em]  border-b-3 border-primary border-l focus:outline-none focus-within:outline-none  rounded-b-lg focus:border-primary shadow-[0_4px_6px_rgba(0,0,0,0.1)]" rows={5}  />
        </label>
          <label className={`mr-0 ml-auto w-20 h-20 rounded-xl  shadow-[0_4px_6px_rgba(0,0,0,0.1)] border border-gray-300 hover:cursor-pointer flex justify-center items-center ${isOtherChecked ? "bg-secondary" : "bg-white"}`} htmlFor={`rule-other`}>
              {<Check className="text-white" size={30}   />}
            </label>
            <input
            id={`rule-other`}
              type="checkbox"
              checked={isOtherChecked}
              onChange={(e) => {
                setIsOtherChecked(e.target.checked);
              }}
              className="hidden"
            />
        </div>
        <div className="flex flex-col gap-2 items-center py-3">
<p className="text-center">J'ai pris conscience et je comprends la politique <span>(cochez la case, puis signer dans l'espace à cet effet)</span></p>
  <label className={` w-14 h-14 rounded-xl  shadow-[0_4px_6px_rgba(0,0,0,0.1)] border border-gray-300 hover:cursor-pointer flex justify-center items-center ${isUnderstandingChecked ? "bg-secondary" : "bg-white"}`} htmlFor={`rule-accept`}>
              {<Check className="text-white" size={30}   />}
            </label>
            <input
            id={`rule-accept`}
              type="checkbox"
              checked={isUnderstandingChecked}
              onChange={(e) => {
                setIsUnderstandingChecked(e.target.checked);
              }}
              className="hidden"
            />
</div>
{isUnderstandingChecked && <VisitorsSignatureBlock onValidate={handleSubmit} />}
</div>}

      </form>
      )}
    </section>
  
  )
}

export default ChecklistBox



