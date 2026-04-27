import { useEffect, useState } from "react";
import { rules } from "../../Utils/Rules";
import { Check } from "lucide-react";
import { scrollToBottom } from "../../../../Utils/scrollToBottom";
import VisitorsSignatureBlock from "../../Components/VisitorsSignatureBlock";
// import { useVisitors } from "../../Contexts/VisitorsContext/UseVisitors";
import VisitorInfo from "../../Components/VisitorInfo";
// import type { ActiveSessionPayload } from "../../Contexts/VisitorsContext/VisitorsContext";

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

    const [fullName, setFullName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [visitReason, setVisitReason] = useState("");

    const [isOtherChecked, setIsOtherChecked] = useState(false);
    const [isUnderstandingChecked, setIsUnderstandingChecked] = useState(false);
    const [otherContent, setOtherContent] = useState("");
    const [currentDate, setCurrentDate] = useState(new Date());

    const [isInfoCompleted, setIsInfoCompleted] = useState(false);

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

    // const { startVisitorSession } = useVisitors();
    
    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   const payload : ActiveSessionPayload = {
    //     full_name: fullName,
    //     company_name: companyName,
    //     visit_reason: visitReason,
    //     arrival_time: new Date(),
    //     arrival_signature_url: "",
    //     checklist: checklist,
        
    //   };
    //   await startVisitorSession(payload);
    // };


   


  return (
    <section className="border border-gray-200 mt-4 w-[min(98%,700px)] py-2  flex flex-col gap-3 shadow-2xl rounded-xl ">
      
        <h2 className="w-full text-center text-[1.8em] border-b pb-2 shadow-[0_4px_6px_rgba(0,0,0,0.1)]  border-primary">{
        isInfoCompleted ? "Politique pour les visiteurs" : "Informations du visiteur" 
       
        }</h2>
     {!isInfoCompleted && <VisitorInfo fullName={fullName} currentDate={currentDate} setFullName={setFullName} companyName={companyName} setCompanyName={setCompanyName} visitReason={visitReason} setVisitReason={setVisitReason} setIsInfoCompleted={setIsInfoCompleted} />} 
         <form action="" className="px-4">
         
        {isInfoCompleted && <div className="flex flex-col gap-4 text-[1.2em] mt-2">
          <p className="text-center">J'accepte les conditions suivantes :</p>
        {(Object.entries(checklist) as Array<[ChecklistKey, boolean]>).map(([key, value]) => (
          <div key={key} className="relative flex items-center  pt-1  ">
            
            <p className="mr-6 pb-3 border-b-3 border-primary border-l pl-10 rounded-b-xl shadow-lg w-full" >{rules[key]}</p>

            <label className={`mr-0 ml-auto w-10 h-10 rounded-xl  shadow-[0_4px_6px_rgba(0,0,0,0.1)] border border-gray-300 hover:cursor-pointer flex justify-center items-center ${value ? "bg-secondary" : "bg-white"}`} htmlFor={`rule-${key}`}>
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
        <label className="flex flex-col items-center gap-2 w-full">
          Autre (précisez): 
          <textarea value={otherContent} onChange={(e) => setOtherContent(e.target.value)}  className="p-2 border-t-0 border-r-0  flex-1 w-full  border-b-3 border-primary border-l focus:outline-none focus-within:outline-none  rounded-b-lg focus:border-primary shadow-[0_4px_6px_rgba(0,0,0,0.1)]" rows={5}  />
        </label>
          <label className={`mr-0 ml-auto w-10 h-10 rounded-xl  shadow-[0_4px_6px_rgba(0,0,0,0.1)] border border-gray-300 hover:cursor-pointer flex justify-center items-center ${isOtherChecked ? "bg-secondary" : "bg-white"}`} htmlFor={`rule-other`}>
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
{isUnderstandingChecked && <VisitorsSignatureBlock />}
</div>}

      </form>
    </section>
  )
}

export default ChecklistBox



