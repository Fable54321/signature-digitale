import { useCallback, useEffect, useMemo, useState } from "react";
import { useForeignWorker } from "../../Contexts/ForeignWorkerContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import IdentityConfirmation from "../../Components/IdentityConfirmation";
import Spinner from "../../Components/Spinner";
import { Document, Page, pdfjs } from "react-pdf";
import SignatureBlock from "../../Components/SignatureBlock";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const ContractPage = () => {
  const {
    worker,
    pdfUrl,
    generateContractPdf,
    pin,
    setPin,
    disconnect,
    getCurrentWorker,
    loading,
    pdfLoading,
  } = useForeignWorker();


  const [contract, setContract] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);

  const [isIdentityConfirmed, setIsIdentityConfirmed] = useState<boolean>(false);


    const onLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    []
  );

 

 
const isLoading = useMemo(() => loading || pdfLoading, [loading, pdfLoading]);

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

<>

    {isLoading && (
      <div className="flex flex-col items-center justify-center h-60">
      <Spinner />
      </div>
      )}

       {!isIdentityConfirmed && worker && <IdentityConfirmation worker={worker} setIsIdentityConfirmed={setIsIdentityConfirmed} disconnect={disconnect} loading={loading} />}
   

   { !isLoading &&  (
    <article className={`flex flex-col items-center w-full relative ${!isIdentityConfirmed ? "blur-sm pointer-events-none" : "" }`}>
      <div className="w-[90%] max-w-5xl mt-10 flex flex-col gap-6">
        <h2 className="text-[1.8em] font-primary text-center">
          Contrato de trabajo
        </h2>

      

        {!isLoading && pdfUrl && (
         <div className="flex justify-center">
           <Document file={pdfUrl} onLoadSuccess={onLoadSuccess}>
              {Array.from({ length: numPages }, (_, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md overflow-hidden"
          >
            <Page pageNumber={index + 1}
             width={900}
             renderTextLayer={false}
             renderAnnotationLayer={false} />
          </div>
        ))}
      </Document>
          </div>
        )}

        

 
      </div>

      <SignatureBlock />

        <div className="flex flex-col gap-2 items-center mt-10">
        <div className="flex flex-row gap-2">
          <button className="button-generic" onClick={() => setContract(contract === 1 ? 2 : 1)} ><ChevronLeft /></button>
          <button className="button-generic" onClick={() => setContract(contract === 2 ? 1 : 2)}><ChevronRight /></button>
        </div>
          <button onClick={() => disconnect()} className="button-generic-red ">Déconnexion</button>

        </div>

        

      </article>
    )}
    
   </> 
   );
  };

export default ContractPage;