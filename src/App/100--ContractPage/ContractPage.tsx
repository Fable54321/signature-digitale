import { useEffect } from "react";
import { useForeignWorker } from "../../Contexts/ForeignWorkerContext";

const ContractPage = () => {
  const {
    worker,
    error,
    pdfUrl,
    generateContractPdf,
  } = useForeignWorker();

 

useEffect(() => {
  if (!worker) return;

  generateContractPdf(worker.pin.toString());
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [worker]);

     
  

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
    </article>
  );
};

export default ContractPage;