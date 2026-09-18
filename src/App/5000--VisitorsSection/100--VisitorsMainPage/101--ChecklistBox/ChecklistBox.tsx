import { useEffect, useMemo, useState } from "react";
import { rules } from "../../Utils/Rules";
import { Check, CircleX, UserRound } from "lucide-react";
import { scrollToBottom, scrollToTop } from "../../../../Utils/scrollToBottom";
import VisitorsSignatureBlock from "../../Components/VisitorsSignatureBlock";
import { useVisitors } from "../../Contexts/VisitorsContext/UseVisitors";
import VisitorInfo from "../../Components/VisitorInfo";
import Spinner from "../../../../Components/Spinner";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../Contexts/VisitorsContext/LanguageContext";




type ChecklistKey = keyof typeof rules;
type ChecklistState = Record<ChecklistKey, boolean>;




const ChecklistBox = () => {
    const { text } = useLanguage();

 
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
    const [isAllcheckedError, setIsAllCheckedError] = useState(false);

    const [isInfoCompleted, setIsInfoCompleted] = useState(false);


useEffect(() => {
  if(isInfoCompleted) {
    scrollToTop();
  }
},[isInfoCompleted])



    const isAllChecked = useMemo(() => {
      return Object.values(checklist).every((value) => value);
    }, [checklist]);

    const handleChecklistChange = (key: ChecklistKey, checked: boolean) => {
      const nextChecklist = {
        ...checklist,
        [key]: checked,
      };

      setChecklist(nextChecklist);

      if (!checked) {
        setIsUnderstandingChecked(false);
      }

      if (Object.values(nextChecklist).every((value) => value)) {
        setIsAllCheckedError(false);
      }
    };

    const handleUnderstandingChange = (checked: boolean) => {
      if (checked && !isAllChecked) {
        setIsUnderstandingChecked(false);
        setIsAllCheckedError(true);
        scrollToTop();
        return;
      }

      setIsAllCheckedError(false);
      setIsUnderstandingChecked(checked);
    };

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

const navigate = useNavigate();

    
const handleNavigateHome = () => {
  navigate("/visiteurs");
}



const handleSubmit = async (signatureDataUrl: string) => {

  if(!isAllChecked){
    setIsAllCheckedError(true);
    scrollToTop();
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
<>
    <section className=" border bg-white border-gray-200 mt-4 w-[min(98%,800px)] py-2 px-2  flex flex-col gap-3 shadow-2xl rounded-xl ">
      
      <div className=" flex items-center gap-5 bg-[#f4f6ee] rounded-xl">
        <div className="bg-secondary p-1 rounded-full">
        <UserRound className="w-full text-tertiary" size={35} />
        </div>
        <h2 className="w-full text-[1.8em] font-primary text-secondary font-bold  pb-2 pt-2  border-primary">
          
          {
        isInfoCompleted ? text.visitorPolicy : text.visitorInformation
       
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
          <div className="flex flex-col items-center gap-2">
          <p className="text-center text-[1.3em] font-bold text-secondary ">{text.acceptConditions}</p>
          <div className="flex items-center justify-center gap-3 rounded-lg border-2 border-secondary bg-tertiary px-4 py-2 text-center font-semibold text-secondary">
            <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded border-2 border-secondary bg-white">
              <Check size={20} strokeWidth={3} />
            </span>
            <p>{text.checkBoxes}</p>
          </div>
          </div>
          {isAllcheckedError && <p className="text-red-500 text-center text-[1em]">{text.acceptAllError}</p>}
        {(Object.entries(checklist) as Array<[ChecklistKey, boolean]>).map(([key, value]) => (
          <label key={key} className="group relative flex cursor-pointer items-stretch gap-3 pt-1 text-black" htmlFor={`rule-${key}`}>
            <input
              id={`rule-${key}`}
              type="checkbox"
              checked={value}
              onChange={(e) => {
                handleChecklistChange(key, e.target.checked);
              }}
              className="peer sr-only"
            />
            <span className="w-full rounded-b-xl border-b-3 border-l border-secondary bg-tertiary py-3 pl-6 pr-3 text-[1.3em] shadow-lg transition-colors group-hover:bg-secondary/10 peer-focus-visible:ring-4 peer-focus-visible:ring-secondary/30">
              {text.rules[key]}
            </span>
            <span
              aria-hidden="true"
              className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border-2 border-secondary shadow-md transition-all group-hover:scale-105 peer-focus-visible:ring-4 peer-focus-visible:ring-secondary/30 ${
                value ? "bg-secondary text-white" : "bg-white text-secondary"
              }`}
            >
              {value ? (
                <Check size={52} strokeWidth={3} />
              ) : (
                <span className="px-1 text-center text-sm font-bold leading-tight">{text.checkBoxPrompt}</span>
              )}
            </span>
          </label>
          
        ))}
        <div className="w-full flex items-center gap-3">
        <label className="flex flex-col items-center gap-2 w-full text-[1.3em] text-secondary font-bold">
          {text.otherSpecify}
          <textarea value={otherContent} onChange={(e) => setOtherContent(e.target.value)}  className="bg-tertiary p-2 border-t-0 border-r-0  flex-1 w-full text-[1em]  border-b-3 border-primary border-l focus:outline-none focus-within:outline-none  rounded-b-lg focus:border-primary shadow-[0_4px_6px_rgba(0,0,0,0.1)]" rows={5}  />
        </label>
          <label className={`mr-0 ml-auto flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-secondary shadow-md transition-all hover:scale-105 ${isOtherChecked ? "bg-secondary text-white" : "bg-white text-secondary"}`} htmlFor={`rule-other`}>
              {isOtherChecked ? <Check size={52} strokeWidth={3} /> : <span className="px-1 text-center text-sm font-bold leading-tight">{text.checkBoxPrompt}</span>}
            </label>
            <input
            id={`rule-other`}
              type="checkbox"
              checked={isOtherChecked}
              onChange={(e) => {
                setIsOtherChecked(e.target.checked);
              }}
              className="sr-only"
            />
        </div>
        <label className="flex cursor-pointer flex-col items-center gap-3 rounded-xl py-3 transition-colors hover:bg-secondary/5" htmlFor={`rule-accept`}>
<p className="text-center text-[1.3em]">{text.policyAcknowledgement} <span>{text.policyAcknowledgementHint}</span></p>
  <span aria-hidden="true" className={`flex h-20 w-20 items-center justify-center rounded-xl border-2 border-secondary shadow-md transition-all hover:scale-105 ${isUnderstandingChecked ? "bg-secondary text-white" : "bg-white text-secondary"}`}>
              {isUnderstandingChecked ? <Check size={52} strokeWidth={3} /> : <span className="px-1 text-center text-sm font-bold leading-tight">{text.checkBoxPrompt}</span>}
            </span>
            <input
            id={`rule-accept`}
              type="checkbox"
              checked={isUnderstandingChecked}
              onChange={(e) => {
                handleUnderstandingChange(e.target.checked);
              }}
              className="sr-only"
            />
</label>
{isUnderstandingChecked && <VisitorsSignatureBlock onValidate={handleSubmit} />}
</div>}

      </form>
      )}
      
    </section>
  <button onClick={handleNavigateHome} className="text-red-600  pt-30">
      <CircleX strokeWidth={2.5} size={64} />
    </button>
    </>
  )
}

export default ChecklistBox



