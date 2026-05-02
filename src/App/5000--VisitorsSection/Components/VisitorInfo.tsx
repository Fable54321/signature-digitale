import { useEffect } from "react";

import QRGenerator from "./QRGenerator";

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

    useEffect(()=> {
      console.log(visitorCategory);
    },[visitorCategory])


     


  



  return (
    <form onSubmit={(e) => {handleInfoCompletion(e)}} className="flex flex-col gap-4 px-2">
      <input
        className="mx-auto w-[97%] border-2 py-2 pl-2 border-secondary mt-2 rounded-lg text-[1.6em]"
        type="text"
        placeholder="Nom complet"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        className="mx-auto w-[97%] border-2 py-2 pl-2 border-secondary mt-2 rounded-lg text-[1.6em]"
        type="text"
        placeholder="Nom de l'entreprise (si applicable)"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <label htmlFor="vistorCategory" className="w-full flex flex-col items-center">
        Quelle catégorie de visiteur s'applique à vous ?
        <select
          className="mx-auto w-[97%] border-2 py-2 pl-2 border-secondary mt-2 rounded-lg text-[1.6em]"
          name="visitorCategory"
          id="visitorCategory"
          value={visitorCategory}
          onChange={(e) => setVisitorCategory(e.target.value)}
        >
          <option className="hidden" value="">{" "}</option>
          <option value="gouvernement">Travailleur du gouvernement</option>
          <option value="client">Client</option>
          <option value="fournisseur">Fournisseur</option>
          <option value="autre">Autre</option>
        </select>
      </label>
      <input
        className="mx-auto w-[97%]  border-2 py-2 pl-2 border-secondary mt-2 rounded-lg text-[1.6em]"
        type="text"
        placeholder="Raison de la visite"
        value={visitReason}
        onChange={(e) => setVisitReason(e.target.value)}
      />
    <p className="text-center text-[1.8em]">Visite en date du : {currentDate.toISOString().slice(0, 10)}</p>
    <p className="text-center text-[1.8em]">Heure actuelle : {currentDate.toLocaleTimeString()}</p>
      
    {visitorCategory !== "gouvernement" && visitorCategory !== "" && <div className=" flex flex-col items-center mb-4 ">
      { url && <QRGenerator url={url} />}
      <div className="flex items-center justify-center gap-4">
      <p className="max-w-[85%] text-[1.3em] my-3">Le plan du site est disponible via le code QR ci-dessus, mais il est recommandé d'entrer votre addresse courriel pour avoir une copie de l'url</p>
     
          
            </div>

 <label htmlFor="email" className="flex flex-col w-full">
       
        <input
          className=" mx-auto w-[97%] border-2 py-2 pl-2 border-secondary mt-2 rounded-lg text-[1.6em]"
          type="email"
          placeholder="laissez vide pour ne pas recevoir de courriel"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
       </label>

            <p className=" text-[0.8em] ">(Vegibec inc. ne conservera pas votre addresse courriel.)</p>
      </div>  }
              
      
      
      

      <button type="submit" className="button-generic text-[2.5em]">Suivant</button>
      
    </form>
  )
}

export default VisitorInfo
