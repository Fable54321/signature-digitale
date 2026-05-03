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
import { scrollToBottom } from "../../Utils/scrollToBottom";
import { useNavigate } from "react-router-dom";

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
    currentIndex,
    setCurrentIndex,
    isPinError,
    pin,
  } = useForeignWorker();

  const navigate = useNavigate();

  const [numPages, setNumPages] = useState<number>(0);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [, setIsSuccess] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isIdentityConfirmed, setIsIdentityConfirmed] = useState<boolean>(false);

  const signedName = useMemo(() => {
    if (!worker) return "";
    return `${worker.name ?? ""} ${worker.surname ?? ""}`.trim();
  }, [worker]);

  const isLoading = useMemo(() => {
    return loading || pdfLoading;
  }, [loading, pdfLoading]);

  const isLastContract = useMemo(() => {
    return contracts.length > 0 && currentIndex === contracts.length - 1;
  }, [contracts.length, currentIndex]);

  const isAllSigned = useMemo(() => {
    return contracts.length > 0 && contracts.every((contract) => contract.status === "signed");
  }, [contracts]);

  const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }, []);

  const handleNextContract = () => {
    if (!acceptedTerms) return;

    setAcceptedTerms(false);
    setCurrentIndex((prev) => Math.min(prev + 1, contracts.length - 1));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    void generateContractPdf();
  }, [generateContractPdf]);

  useEffect(() => {
    if (acceptedTerms) scrollToBottom();
  }, [acceptedTerms]);

  useEffect(() => {
    if (!pin || pin.length === 0) {
      void navigate("/");
    }
  }, [navigate, pin]);

  useEffect(() => {
    if (!isAllSigned) return;

    setIsDone(true);
    setIsSuccess(false);

    const timeout = setTimeout(() => {
      window.location.replace("/");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isAllSigned]);

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
          className={`flex flex-col pb-6 items-center w-full relative ${
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

            <p className="text-center text-[1.2em]">
              Contrato {currentIndex + 1} de {contracts.length}
            </p>

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
            {isLastContract
  ? "Confirmo que he leído y comprendido todos los contratos y acepto firmarlos."
  : "Confirmo que he leído y comprendido la información anterior."}
          </label>

          {!isLastContract && acceptedTerms && (
            <button
              onClick={handleNextContract}
              disabled={pdfLoading}
              className="button-generic text-[1.5em] mt-8 w-[min(90%,500px)]"
            >
              Siguiente contrato
            </button>
          )}

          {isLastContract && acceptedTerms && (
            <SignatureBlock
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
