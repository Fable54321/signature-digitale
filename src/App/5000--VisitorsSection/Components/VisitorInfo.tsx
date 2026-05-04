import { useEffect } from "react";

import QRGenerator from "./QRGenerator";
import { BriefcaseBusiness, CalendarDays, Clock4, ContactRound, NotepadText, Send, UserRound } from "lucide-react";

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





 


    const handleInfoCompletion = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // if (!fullName || !visitReason || !visitorCategory){
        //     alert("Veuillez indiquez au moins le nom complet, la catégorie du visiteur et la raison de la visite.");
        //     return;
        // }
       

      
      setIsInfoCompleted(true);
    };

   


     


  



  return (
    <form onSubmit={(e) => {handleInfoCompletion(e)}} className="flex flex-col gap-4 px-2">
<div className="flex items-center gap-5">
    <div className="p-2 bg-[#f4f6ee] rounded-xl">
      <UserRound className="w-full text-secondary" size={50} />
    </div>

      <input
        className="mx-auto bg-white w-[97%] border-2 py-2 pl-2 border-secondary mt-2 rounded-lg text-[1.6em]"
        type="text"
        placeholder="Nom complet"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
</div>

<div className="flex items-center gap-5">

    <div className="p-2 bg-[#f4f6ee] rounded-xl">
      <BriefcaseBusiness className="w-full text-secondary" size={50} />
    </div>

      <input
        className="mx-auto bg-white w-[97%] border-2 py-2 pl-2 border-secondary mt-2 rounded-lg text-[1.6em]"
        type="text"
        placeholder="Nom de l'entreprise (si applicable)"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
</div>


      <label htmlFor="vistorCategory" className="w-full flex flex-col">
      <span className="ml-4 text-secondary font-medium">  Quelle catégorie de visiteur s'applique à vous ? </span>

<div className="flex items-center w-full gap-5 mt-2">

<div className="p-2 bg-[#f4f6ee] rounded-xl">
  <ContactRound className="w-full text-secondary" size={50} />
</div>

        <select
          className="mx-auto bg-white w-[97%] border-2 py-2 pl-2 border-secondary mt-2 rounded-lg text-[1.6em] "
          name="visitorCategory"
          id="visitorCategory"
          value={visitorCategory}
          onChange={(e) => setVisitorCategory(e.target.value)}
        >
          <option value="" disabled>
  Sélectionner une catégorie
</option>
          <option value="gouvernement">Travailleur du gouvernement</option>
          <option value="client">Client</option>
          <option value="fournisseur">Fournisseur</option>
          <option value="autre">Autre</option>
        </select>

    </div>

      </label>
      
      <div className="flex items-center gap-5 border-b-2 border-[#e5ebd5] pb-7 border-dashed">

      <div className="p-2 bg-[#f4f6ee] rounded-xl">
        <NotepadText className="w-full text-secondary" size={50} />
      </div>


      <input
        className="mx-auto bg-white w-[97%]  border-2 py-2 pl-2 border-secondary mt-2 rounded-lg text-[1.6em]"
        type="text"
        placeholder="Raison de la visite"
        value={visitReason}
        onChange={(e) => setVisitReason(e.target.value)}
      />
</div>

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
          className=" mx-a bg-whiteuto w-[97%] border-2 py-2 pl-2 border-secondary mt-2 rounded-lg text-[1.6em]"
          type="email"
          placeholder="laissez vide pour ne pas recevoir de courriel"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
       </label>

            <p className=" text-[0.8em] ">(Vegibec inc. ne conservera pas votre addresse courriel.)</p>
      </div>  }
              
      
      
      

      <button type="submit" className="button-generic text-[2.5em]">Suivant</button>
      
    </form>
  )
}

export default VisitorInfo
