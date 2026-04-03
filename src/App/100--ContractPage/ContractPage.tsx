import { useEffect, useState } from "react";
import { useForeignWorker } from "../../Contexts/ForeignWorkerContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ContractPage = () => {
  const {
    worker,
    error,
    pdfUrl,
    generateContractPdf,
    pin,
    setPin,
    disconnect,
    getCurrentWorker,
  } = useForeignWorker();


  const [contract, setContract] = useState<number>(2);

 


  const contracts: Record<number, string> = {
    1: "PTAS",
    2: "PTET",
  }

useEffect(() => {
  getCurrentWorker();
  
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


useEffect(() => {
  if(!worker) return;

  setPin(worker?.pin.toString() || "");
  generateContractPdf(pin, contracts[contract]);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [worker, contract]);



useEffect(() => {console.log("worker in ContractPage:", worker?.email);},[worker])







     
  

  return (
    <article className="flex flex-col items-center w-full">
      <div className="w-[90%] max-w-5xl mt-10 flex flex-col gap-6">
        <h2 className="text-[1.8em] font-primary text-center">
          Contrat travailleur
        </h2>

        

        {error && <p className="text-red-600">{error}</p>}

        {worker && (
          <div className="rounded-md border p-4 bg-white">
            <p>
              <strong>Nom :</strong> {worker.surname} {worker.name}
            </p>
            <p>
              <strong>Poste :</strong> {worker.job_title}
            </p>
            <p>
              <strong>Pays :</strong> {worker.residence_country}
            </p>
          </div>
        )}

        {pdfUrl && (
          <iframe
            src={pdfUrl}
            title="Contrat PDF"
            className="w-full h-225 border rounded-md bg-white"
          />
        )}
      </div>

        <div className="flex flex-col gap-2 items-center mt-10">
        <div className="flex flex-row gap-2">
          <button className="button-generic" onClick={() => setContract(contract === 1 ? 2 : 1)} ><ChevronLeft /></button>
          <button className="button-generic" onClick={() => setContract(contract === 2 ? 1 : 2)}><ChevronRight /></button>
        </div>
          <button onClick={() => disconnect()} className="button-generic-red ">Déconnexion</button>

        </div>

      </article>
    );
  };

export default ContractPage;