import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

type Props = {
    fullName: string;
    setFullName: React.Dispatch<React.SetStateAction<string>>;
    companyName: string;
    setCompanyName: React.Dispatch<React.SetStateAction<string>>;
    visitReason: string;
    setVisitReason: React.Dispatch<React.SetStateAction<string>>;
    setIsInfoCompleted: React.Dispatch<React.SetStateAction<boolean>>;
    currentDate: Date;
    wantsEmail: boolean;
    setWantsEmail: React.Dispatch<React.SetStateAction<boolean>>
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>
    visitorCategory: string;
    setVisitorCategory: React.Dispatch<React.SetStateAction<string>>
}


type OutletContextType = { token: string };
type PlanUrlResponse = {
    url: string;
    expiresIn: number;
    expiresAt: string;
};

const VisitorInfo = ({ fullName,
    setFullName,
    companyName,
    setCompanyName,
    visitReason,
    setVisitReason,
    setIsInfoCompleted,
    currentDate,
    wantsEmail,

    email,
    setEmail,
    visitorCategory,
    setVisitorCategory,
 }: Props) => {





  const { token } = useOutletContext<OutletContextType>();
  const [planHref, setPlanHref] = useState<string | null>(null);


    const handleInfoCompletion = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!fullName || !visitReason || !visitorCategory){
            alert("Veuillez indiquez au moins le nom complet, la catégorie du visiteur et la raison de la visite.");
            return;
        }
        if( wantsEmail && !email){
            alert("Veuillez indiquez votre adresse courriel ou décochez la case pour recevoir le plan du site.");
            return;
        }

      
      setIsInfoCompleted(true);
    };

    useEffect(()=> {
      console.log(visitorCategory);
    },[visitorCategory])

    useEffect(() => {
      let ignore = false;

      const loadPlanUrl = async () => {
        try {
          const planUrlData = await fetchWithAuth<PlanUrlResponse>("/visitors/plan-url");

          if (ignore || !planUrlData?.url) {
            return;
          }

          const url = new URL(planUrlData.url, window.location.origin);

          if (url.pathname.startsWith("/plan-du-site")) {
            setPlanHref(`${url.pathname}${url.search}`);
            return;
          }

          setPlanHref(`/plan-du-site/${token}?planUrl=${encodeURIComponent(planUrlData.url)}`);
        } catch (error) {
          console.error("Erreur chargement plan du site:", error);
        }
      };

      loadPlanUrl();

      return () => {
        ignore = true;
      };
    }, [token]);


     


  



  return (
    <form onSubmit={(e) => {handleInfoCompletion(e)}} className="flex flex-col gap-4 px-2">
      <input
        className="border-2 py-2 pl-2 border-secondary mt-2 rounded-lg text-[1.6em]"
        type="text"
        placeholder="Nom complet"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        className="border-2 py-2 pl-2 border-secondary mt-2 rounded-lg text-[1.6em]"
        type="text"
        placeholder="Nom de l'entreprise"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <label htmlFor="vistorCategory" className="w-full">
        Quelle catégorie de visiteur s'applique à vous ?
        <select
          className="border-2 py-2 pl-2 border-secondary w-full mt-2 rounded-lg text-[1.6em]"
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
        className="border-2 py-2 pl-2 border-secondary mt-2 rounded-lg text-[1.6em]"
        type="text"
        placeholder="Raison de la visite"
        value={visitReason}
        onChange={(e) => setVisitReason(e.target.value)}
      />
    <p className="text-center text-[1.8em]">Visite en date du : {currentDate.toISOString().slice(0, 10)}</p>
    <p className="text-center text-[1.8em]">Heure actuelle : {currentDate.toLocaleTimeString()}</p>
      
    {visitorCategory !== "gouvernement" && visitorCategory !== "" && <div className=" flex flex-col items-center my-4">
      <div className="flex items-center justify-center gap-4">
      <p className="max-w-[85%] text-[1.3em]">Le plan du site est disponible via le code QR ci-dessus, mais il est recommandé d'entrer votre addresse courriel pour avoir une copie de l'url</p>
     
          
            </div>

 <label htmlFor="email" className="flex flex-col w-full">
       
        <input
          className=" border-2 py-2 pl-2 border-secondary mt-2 rounded-lg text-[1.6em]"
          type="email"
          placeholder="laissez vide pour ne pas recevoir de courriel"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
       </label>

            <p className=" text-[0.8em] ">(Vegibec inc. ne conservera pas votre addresse courriel.)</p>
      </div>  }
              
       {planHref ? (
        <a href={planHref} target="_blank" rel="noreferrer" className="text-[1.6em] font-bold text-secondary">Plan du site</a>
       ) : (
        <span className="text-[1.6em] font-bold text-gray-400">Chargement du plan...</span>
       )}
      
      

      <button type="submit" className="button-generic text-[2.5em]">Suivant</button>
      
    </form>
  )
}

export default VisitorInfo
