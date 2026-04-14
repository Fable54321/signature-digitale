import { useCallback, useEffect, useMemo, useState } from "react";
import { useForeignWorker } from "../../Contexts/ForeignWorkerContext";
// import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { LogOut } from "lucide-react";
import IdentityConfirmation from "../../Components/IdentityConfirmation";
import Spinner from "../../Components/Spinner";
import { Document, Page, pdfjs } from "react-pdf";
import SignatureBlock from "../../Components/SignatureBlock";

import DoneSigning from "../../Components/DoneSigning";
import NipError from "../../Components/NipError";
import "../../Components/CSS/IdentityConfirmation.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const ContractPage = () => {
const {
  worker,
  pdfUrl,
  generateContractPdf,
  setPin,
  disconnect,
  getCurrentWorker,
  loading,
  pdfLoading,
  currentContract,
  contracts,
  isPinError,
} = useForeignWorker();


 
  const [numPages, setNumPages] = useState<number>(0);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [signedName, ] = useState<string>("");
  const [, setIsSuccess] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isIdentityConfirmed, setIsIdentityConfirmed] = useState<boolean>(false);



    const onLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    []
  );


 

 
const isLoading = useMemo(() => loading || pdfLoading, [loading, pdfLoading]);

const isAllSigned = useMemo(
  () => contracts.length > 0 && contracts.every((contract) => contract.status === "signed"),
  [contracts]
);

useEffect(() => {
  if (!isAllSigned) return;

  setIsDone(true);
  setIsSuccess(false);

  const timeout = setTimeout(() => {
    setIsDone(false);
    void disconnect();
  }, 1200);

  return () => clearTimeout(timeout);
}, [isAllSigned, disconnect]);

useEffect(() => {
  setAcceptedTerms(false);
}, [currentContract?.contractId]);

useEffect(() => {
  getCurrentWorker();
  
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


useEffect(() => {
  if (!worker) return;

  setPin(worker.pin?.toString() || "");
  void generateContractPdf(worker.pin?.toString() || "");
}, [worker, setPin, generateContractPdf]);






const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};


useEffect(() => {
  scrollToBottom();
},[acceptedTerms])










     
  

  return (

<>

    {isLoading && !isPinError && (
      <div className="flex flex-col items-center justify-center h-60">
      <Spinner />
      </div>
      )}

       {!isIdentityConfirmed && worker && !isPinError && !isAllSigned &&
       
        <IdentityConfirmation worker={worker} setIsIdentityConfirmed={setIsIdentityConfirmed} disconnect={disconnect} loading={loading} />
        
        }
      {/* {isSuccess && <SignatureSuccess />} */}
      {isDone && <DoneSigning />}
      {isPinError && <NipError />}

   { !isLoading &&  (

    
    <article className={`flex flex-col items-center w-full relative ${!isIdentityConfirmed ? "blur-sm pointer-events-none" : "" }`}>

       {/* <div className="flex flex-row gap-2">
          <button className="button-generic" onClick={() => prevContract()} ><ChevronLeft /></button>
          <button className="button-generic" onClick={() => nextContract()}><ChevronRight /></button>
        </div> */}
<button onClick={() => disconnect()} className="button-generic-red absolute top-2 right-2 "><LogOut /></button>

      <div className="w-[90%] max-w-5xl mt-10 flex flex-col gap-6">
        <h2 className="text-[1.8em] font-primary text-center">
          Contrato de trabajo
        </h2>

      

        {pdfUrl && (
         <div className="flex justify-center">
           <Document file={pdfUrl} onLoadSuccess={onLoadSuccess} loading={<div className="flex flex-col items-center justify-center h-60"><Spinner /></div>} error={<div className="flex flex-col items-center justify-center h-60"><p className="text-red-500 text-[1.5em]">Error al cargar el PDF</p></div>} >
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

      <label htmlFor="" className="mt-4 text-[1.7em] font-bold flex   flex-col-reverse items-center max-w-2xl text-center ">
       
        <input
        className="w-16 h-16 mt-2 "
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
        />
         <span className="text-[0.7em] font-light">(Marcar la casilla)</span>
        Confirmo que he leído y comprendido la información anterior.

      </label>

     { acceptedTerms && 
     <SignatureBlock 
     contractId={currentContract?.contractId ?? 0} 
     acceptedTerms={acceptedTerms} 
     signedName={signedName} 
     setAcceptedTerms={setAcceptedTerms}
     setIsSuccess={setIsSuccess} />}

        <div className="flex flex-col gap-2 items-center mt-10">
        {/* <div className="flex flex-row gap-2">
          <button className="button-generic" onClick={() => setContract(contract === 1 ? 11 : contract - 1)} ><ChevronLeft /></button>
          <button className="button-generic" onClick={() => setContract(contract === 11 ? 1 : contract + 1)}><ChevronRight /></button>
        </div>
           */}

        </div>

        

      </article>
    )}
    
   </> 
   );
  };

export default ContractPage;