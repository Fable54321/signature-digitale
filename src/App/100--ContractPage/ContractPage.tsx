import { useCallback, useEffect, useMemo, useState } from "react";
import { useForeignWorker } from "../../Contexts/ForeignWorkerContext";
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
    disconnect,
    loading,
    pdfLoading,
    currentContract,
    contracts,
    isPinError,
  } = useForeignWorker();

  const [numPages, setNumPages] = useState<number>(0);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [signedName] = useState<string>("");
  const [, setIsSuccess] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isIdentityConfirmed, setIsIdentityConfirmed] = useState<boolean>(false);

  const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }, []);

  const isLoading = useMemo(() => {
    return loading || pdfLoading;
  }, [loading, pdfLoading]);

  const isAllSigned = useMemo(() => {
    return contracts.length > 0 && contracts.every((contract) => contract.status === "signed");
  }, [contracts]);

  useEffect(() => {
    void generateContractPdf();
  }, [generateContractPdf]);

  

  useEffect(() => {
    if (!isAllSigned) return;

    setIsDone(true);
    setIsSuccess(false);

    const timeout = setTimeout(() => {
      setIsDone(false);
      void disconnect();
    }, 1800);

    return () => clearTimeout(timeout);
  }, [isAllSigned, disconnect]);

  useEffect(() => {
    setAcceptedTerms(false);
  }, [currentContract?.contractId]);

  useEffect(() => {
    setNumPages(0);
  }, [pdfUrl]);

  return (
    <>
      {isLoading && !isPinError && (
        <div className="flex flex-col items-center justify-center h-60">
          <Spinner />
        </div>
      )}

      {!isIdentityConfirmed && worker && !isPinError && !isAllSigned && (
        <IdentityConfirmation
          worker={worker}
          setIsIdentityConfirmed={setIsIdentityConfirmed}
          disconnect={disconnect}
          loading={loading}
        />
      )}

      {isDone && <DoneSigning />}
      {isPinError && <NipError />}

      {!isLoading && worker && currentContract && !isDone && (
        <article
          className={`flex flex-col items-center w-full relative ${
            !isIdentityConfirmed ? "blur-sm pointer-events-none" : ""
          }`}
        >
          <button
            onClick={() => void disconnect()}
            className="button-generic-red absolute top-2 right-2"
          >
            <LogOut />
          </button>

          <div className="w-[90%] max-w-5xl mt-10 flex flex-col gap-6">
            <h2 className="text-[1.8em] font-primary text-center">
              Contrato de trabajo
            </h2>

            {pdfUrl && (
              <div className="flex justify-center">
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onLoadSuccess}
                  loading={
                    <div className="flex flex-col items-center justify-center h-60">
                      <Spinner />
                    </div>
                  }
                  error={
                    <div className="flex flex-col items-center justify-center h-60">
                      <p className="text-red-500 text-[1.5em]">
                        Error al cargar el PDF
                      </p>
                    </div>
                  }
                >
                  {Array.from({ length: numPages }, (_, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-md overflow-hidden"
                    >
                      <Page
                        pageNumber={index + 1}
                        width={900}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    </div>
                  ))}
                </Document>
              </div>
            )}
          </div>

          <label className="mt-4 text-[1.7em] font-bold flex flex-col-reverse items-center max-w-2xl text-center">
            <input
              className="w-16 h-16 mt-2"
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <span className="text-[0.7em] font-light">(Marcar la casilla)</span>
            Confirmo que he leído y comprendido la información anterior.
          </label>

          {acceptedTerms && (
            <SignatureBlock
              contractId={currentContract.contractId}
              acceptedTerms={acceptedTerms}
              signedName={signedName}
              setAcceptedTerms={setAcceptedTerms}
              setIsSuccess={setIsSuccess}
            />
          )}
        </article>
      )}
    </>
  );
};

export default ContractPage;