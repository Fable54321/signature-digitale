type Props = {
    fullName: string;
    setFullName: React.Dispatch<React.SetStateAction<string>>;
    companyName: string;
    setCompanyName: React.Dispatch<React.SetStateAction<string>>;
    visitReason: string;
    setVisitReason: React.Dispatch<React.SetStateAction<string>>;
    setIsInfoCompleted: React.Dispatch<React.SetStateAction<boolean>>;
    currentDate: Date;
}

const VisitorInfo = ({ fullName,
    setFullName,
    companyName,
    setCompanyName,
    visitReason,
    setVisitReason,
    setIsInfoCompleted,
    currentDate
 }: Props) => {


    const handleInfoCompletion = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!fullName || !visitReason){
            alert("Veuillez indiquez au moins le nom complet et la raison de la visite.");
            return;
        }

      
      setIsInfoCompleted(true);
    };



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
        placeholder="Nom de la compagnie"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <input
        className="border-2 py-2 pl-2 border-secondary mt-2 rounded-lg text-[1.6em]"
        type="text"
        placeholder="Raison de la visite"
        value={visitReason}
        onChange={(e) => setVisitReason(e.target.value)}
      />
    <p className="text-center text-[1.8em]">Visite en date du : {currentDate.toISOString().slice(0, 10)}</p>
    <p className="text-center text-[1.8em]">Heure actuelle : {currentDate.toLocaleTimeString()}</p>
      <button type="submit" className="button-generic text-[2.5em]">Suivant</button>
      
    </form>
  )
}

export default VisitorInfo
