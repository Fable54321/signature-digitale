

import QRGenerator from "./QRGenerator";
import { AlertCircle, BriefcaseBusiness, CalendarDays, Clock4, ContactRound, NotepadText, Send, UserRound } from "lucide-react";
import { scrollToBottom } from "../../../Utils/scrollToBottom";
import { useEffect, useMemo, useState } from "react";

type Props = {
    fullName: string;
    setFullName: React.Dispatch<React.SetStateAction<string>>;
    companyName: string;
    setCompanyName: React.Dispatch<React.SetStateAction<string>>;
    visitReason: string;
    setVisitReason: React.Dispatch<React.SetStateAction<string>>;
    setIsInfoCompleted: React.Dispatch<React.SetStateAction<boolean>>;
    currentDate: Date;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>
    visitorCategory: string;
    setVisitorCategory: React.Dispatch<React.SetStateAction<string>>
    url: string | null
}




const VisitorInfo = ({ fullName,
    setFullName,
    companyName,
    setCompanyName,
    visitReason,
    setVisitReason,
    setIsInfoCompleted,
    currentDate,
   url,
    email,
    setEmail,
    visitorCategory,
    setVisitorCategory,
 }: Props) => {



const [nameError, setNameError] = useState(false);
const [visitReasonError, setVisitReasonError] = useState(false);
const [visitorCategoryError, setVisitorCategoryError] = useState(false);
const [hasEmailError, setHasEmailError] = useState(false);

const inputClassName = "mx-auto bg-white w-[97%] border-2 py-2 pl-2 border-secondary mt-2 rounded-lg text-[1.6em] focus:outline-none focus:ring-2 focus:ring-secondary/30";
const inputErrorClassName = "border-red-500 bg-red-50 focus:ring-red-200";
const errorClassName = "flex items-center gap-2 text-red-600 text-[0.95em] font-medium";

const FieldError = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <p id={id} className={errorClassName} role="alert">
    <AlertCircle size={18} aria-hidden="true" />
    <span>{children}</span>
  </p>
);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const handleInfoCompletion = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const hasNameError = !fullName;
        const hasVisitReasonError = !visitReason;
        const hasVisitorCategoryError = !visitorCategory;
        const hasEmailError = !email ? false : !emailRegex.test(email);

        setNameError(hasNameError);
        setVisitReasonError(hasVisitReasonError);
        setVisitorCategoryError(hasVisitorCategoryError);
        setHasEmailError(hasEmailError);



        if (hasNameError || hasVisitReasonError || hasVisitorCategoryError || hasEmailError) {
            return;
        }
       

      
      setIsInfoCompleted(true);
    };

   
const isQrVisbile = useMemo(() => {
  return visitorCategory !== "gouvernement" && visitorCategory !== "" && url !== null;
}, [visitorCategory, url])

     useEffect(() => { 
      if(isQrVisbile) {
        scrollToBottom();
      }
      },[isQrVisbile])

const visitorCategoryOptions = [
  { value: "gouvernement", label: "Travailleur du gouvernement" },
  { value: "client", label: "Client" },
  { value: "fournisseur", label: "Fournisseur" },
  { value: "autre", label: "Autre" },
];

const visitReasonQuickOptions = ["Pick-up", "Livraison"];

const [isCategoryOpen, setIsCategoryOpen] = useState(false);

const selectedCategoryLabel =
  visitorCategoryOptions.find((option) => option.value === visitorCategory)?.label ||
  "";
  



  return (
    <form onSubmit={(e) => {handleInfoCompletion(e)}} noValidate className="flex flex-col gap-4 px-2">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-5">
    <div className="p-2 bg-[#f4f6ee] rounded-xl">
      <UserRound className="w-full text-secondary" size={50} />
    </div>

      <input
        className={`${inputClassName} ${nameError ? inputErrorClassName : ""}`}
        type="text"
        placeholder="Nom complet"
        value={fullName}
        aria-invalid={nameError}
        aria-describedby={nameError ? "visitor-name-error" : undefined}
        onChange={(e) => {
          setFullName(e.target.value);
          if (nameError) {
            setNameError(false);
          }
        }}
      />
      
</div>
{nameError && <FieldError id="visitor-name-error">Le nom complet est requis.</FieldError>}
</div>
<div className="flex items-center gap-5">

    <div className="p-2 bg-[#f4f6ee] rounded-xl">
      <BriefcaseBusiness className="w-full text-secondary" size={50} />
    </div>

      <input
        className={inputClassName}
        type="text"
        placeholder="Nom de l'entreprise (si applicable)"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      
</div>


      
      
      <div className="flex flex-col gap-1">
      <div className="flex items-center gap-5 ">

      <div className="p-2 bg-[#f4f6ee] rounded-xl">
        <NotepadText className="w-full text-secondary" size={50} />
      </div>


      <input
        className={`${inputClassName} ${visitReasonError ? inputErrorClassName : ""}`}
        type="text"
        placeholder="Raison de la visite"
        value={visitReason}
        aria-invalid={visitReasonError}
        aria-describedby={visitReasonError ? "visit-reason-error" : undefined}
        onChange={(e) => {
          setVisitReason(e.target.value);
          if (visitReasonError) {
            setVisitReasonError(false);
          }
        }}
      />
      
</div>
<div className="ml-17.5 flex flex-wrap gap-2" aria-label="Raisons de visite rapides">
  {visitReasonQuickOptions.map((reason) => (
    <button
      key={reason}
      type="button"
      aria-pressed={visitReason === reason}
      onClick={() => {
        setVisitReason(reason);
        if (visitReasonError) {
          setVisitReasonError(false);
        }
      }}
      className={`rounded-lg border-2 border-secondary cursor-pointer px-4 py-2 text-[1.1em] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/30 ${
        visitReason === reason
          ? "bg-secondary text-white"
          : "bg-white text-secondary hover:bg-[#f4f6ee]"
      }`}
    >
      {reason}
    </button>
  ))}
</div>
</div>
{visitReasonError && <FieldError id="visit-reason-error">La raison de la visite est requise.</FieldError>}
<label htmlFor="visitorCategory" className="w-full flex flex-col border-b-2 border-[#e5ebd5] pb-7 border-dashed">
      <span className="ml-4 text-secondary font-medium">  Quelle catégorie de visiteur s'applique à vous ? </span>

<div className="flex items-center w-full gap-5 mt-2">

<div className="p-2 bg-[#f4f6ee] rounded-xl">
  <ContactRound className="w-full text-secondary" size={50} />
</div>

  <div className="relative mx-auto w-[97%] mt-2 text-[1.6em]">
  <button
    id="visitorCategory"
    type="button"
    onClick={() => setIsCategoryOpen((prev) => !prev)}
    className={`w-full bg-white border-2 py-2 pl-2 pr-10 border-secondary rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-secondary/30 ${visitorCategoryError ? inputErrorClassName : ""}`}
    aria-haspopup="listbox"
    aria-expanded={isCategoryOpen}
    aria-invalid={visitorCategoryError}
    aria-describedby={visitorCategoryError ? "visitor-category-error" : undefined}
  >
    {selectedCategoryLabel || "Sélectionnez une catégorie"}
    <span className="absolute right-4 top-1/2 -translate-y-1/2">▾</span>
  </button>

  {isCategoryOpen && (
    <div className="absolute z-50 mt-1 w-full bg-white border-2 border-secondary rounded-lg shadow-lg overflow-hidden">
      
      {visitorCategoryOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => {
            setVisitorCategory(option.value);
            if (visitorCategoryError) {
              setVisitorCategoryError(false);
            }
            setIsCategoryOpen(false);
          }}
          className={`block w-full text-left px-3 py-3 ${
            visitorCategory === option.value
              ? "bg-secondary text-white"
              : "bg-white text-black"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )}
</div>

    </div>
    
      </label>
{visitorCategoryError && <FieldError id="visitor-category-error">La cat&eacute;gorie de visiteur est requise.</FieldError>}
<div className="mt-2 relative flex  justify-between items-center  py-3.5  bg-[#f4f6ee] rounded-xl ">
  <div className="flex items-center gap-5 pl-15">
    <div className="bg-[#e5ebd5] p-2 rounded-xl">
      <CalendarDays className="w-full text-secondary" size={50} />
    </div>
  <div className="flex flex-col">
    <div className=" text-[0.9em]"><p>Visite en date du :</p> </div>
    <p className="text-[1.5em]">{currentDate.toISOString().slice(0, 10)}</p>
  </div>
  </div>
  <div className="flex items-center gap-5 pr-15">
    <div className="bg-[#e5ebd5] p-2 rounded-xl">
      <Clock4 className="w-full text-secondary" size={50} />
    </div>
  <div className="flex flex-col">
    <div className=" text-[0.9em]"><p>Heure actuelle : </p></div>
    <p className="text-[1.5em]">{currentDate.toLocaleTimeString()}</p>
  </div>
  </div>
  <div className="absolute h-[85%]  w-0.5 bg-[#e5ebd5] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
</div>

      


    {visitorCategory !== "gouvernement" && visitorCategory !== "" && 
    <div className=" flex flex-col items-center mb-4 border-t-2 border-[#e5ebd5] mt-2 pt-6 border-dashed ">
      { url && <QRGenerator url={url} />}
     
    
    
    <div className="bg-[#e5ebd5] px-3 py-3 my-6 rounded-xl">
      <p className="w-full px-2 py-1 text-secondary font-medium bg-tertiary rounded-xl text-[1.3em]">Le plan du site est disponible via le code QR ci-dessus, mais il est recommandé d'entrer votre adresse courriel pour avoir une copie de l'url</p>
      </div>
          
            

 <label htmlFor="email" className="flex flex-col w-full ">
       <div className="flex items-center gap-5">

    <div className="p-2 bg-[#e5ebd5] rounded-xl">
      <Send className="w-full text-secondary" size={50} />
    </div>
        <input
          id="email"
          className={`${inputClassName} ${hasEmailError ? inputErrorClassName : ""}`}
          type="email"
          inputMode="email"
          placeholder="laissez vide pour ne pas recevoir de courriel"
          value={email}
          aria-invalid={hasEmailError}
          aria-describedby={hasEmailError ? "email-error" : undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            if (hasEmailError) {
              setHasEmailError(false);
            }
          }}
        />
        </div>
       </label>

            <p className=" text-[0.8em] ">(Vegibec inc. ne conservera pas votre addresse courriel.)</p>
      </div>  }
      {hasEmailError && <FieldError id="email-error">Veuillez entrer une adresse courriel valide ou laisser le champ vide.</FieldError>}        
      
      
      

      <button type="submit" className="button-generic text-[2.5em]">Suivant</button>
      
    </form>
  )
}

export default VisitorInfo
