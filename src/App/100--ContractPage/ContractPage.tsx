import { useCallback, useEffect, useMemo, useState } from "react";
import { useForeignWorker } from "../../Contexts/ForeignWorkerContext";
// import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { LogOut } from "lucide-react";
import IdentityConfirmation from "../../Components/IdentityConfirmation";
import Spinner from "../../Components/Spinner";
import { Document, Page, pdfjs } from "react-pdf";
import SignatureBlock from "../../Components/SignatureBlock";
import SignatureSuccess from "../../Components/SignatureSuccess";
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
    pin,
    setPin,
    disconnect,
    getCurrentWorker,
    loading,
    pdfLoading,
    currentContractId,
    isPinError,
  } = useForeignWorker();


 
  const [numPages, setNumPages] = useState<number>(0);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [signedName, ] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isIdentityConfirmed, setIsIdentityConfirmed] = useState<boolean>(false);
   const [contract, setContract] = useState<number>(1);


    const onLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    []
  );


 

 
const isLoading = useMemo(() => loading || pdfLoading, [loading, pdfLoading]);

  const contracts: Record<number, string> = useMemo(() => ({
    1: "PTAS",
    2: "PTET",
    3: "0Au",
    4: "0Av",
    5: "0Lo",
    6: "Aut-ded",
    7: "Aut-ret",
    8: "Pol-bris",
    9: "Pol-harc",
    10: "Pol-prot",
    11: "Pol-vio",
  }), [])



const availableContracts = useMemo(() => {
  if (!worker) return contracts;

  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(contracts).filter(([_, slug]) => {
      if (worker.contract_type === "PTAS") return slug !== "PTET";
      if (worker.contract_type === "PTET") return slug !== "PTAS";
      return true;
    })
  );
}, [contracts, worker]);


useEffect(() => {
  getCurrentWorker();
  
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


useEffect(() => {
  if(!worker) return;

  setPin(worker?.pin.toString() || "");
  generateContractPdf(pin, availableContracts[contract]);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [worker, contract]);





const contractKeys = Object.keys(availableContracts).map(Number);



const nextContract = () => {
  if(contract > contractKeys.length)  {
    setIsDone(true);
   setIsSuccess(false);
    setTimeout(() => {
      setIsDone(false);
      disconnect();
    }, 1800);

    return
  }
  const index = contractKeys.indexOf(contract);
  const nextIndex = (index + 1) % contractKeys.length;
  setContract(contractKeys[nextIndex]);
};

// const prevContract = () => {
//   const index = contractKeys.indexOf(contract);
//   const prevIndex = (index - 1 + contractKeys.length) % contractKeys.length;
//   setContract(contractKeys[prevIndex]);
// };





     
  

  return (

<>

    {isLoading && !isPinError && (
      <div className="flex flex-col items-center justify-center h-60">
      <Spinner />
      </div>
      )}

       {!isIdentityConfirmed && worker && !isPinError &&
       
        <IdentityConfirmation worker={worker} setIsIdentityConfirmed={setIsIdentityConfirmed} disconnect={disconnect} loading={loading} />
        
        }
      {isSuccess && <SignatureSuccess />}
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
     next={nextContract} 
     contractId={currentContractId} 
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