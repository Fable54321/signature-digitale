import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useForeignWorker } from "../Contexts/ForeignWorkerContext";

type SignatureBlockProps = {
  acceptedTerms: boolean;
  setAcceptedTerms: React.Dispatch<React.SetStateAction<boolean>>;
  signedName: string;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignatureBlock = ({
  acceptedTerms,
  signedName,
  setAcceptedTerms,
  setIsSuccess,
}: SignatureBlockProps) => {
  const sigCanvas = useRef<SignatureCanvas | null>(null);

  const {
    signAllContracts,
    saveSessionSignature,
    sessionSignatureDataUrl,
    pdfLoading,
    setError,
    error,
  } = useForeignWorker();

  const clear = () => {
    sigCanvas.current?.clear();
  };

  const handleValidate = async () => {
    if (!acceptedTerms) {
      setError("Debe aceptar las condiciones");
      return;
    }

    if (!signedName.trim()) {
      setError("Debe ingresar su nombre");
      return;
    }

    let signatureSaved = true;

    if (!sessionSignatureDataUrl) {
      if (!sigCanvas.current) {
        setError("Zone de signature introuvable");
        return;
      }

      if (sigCanvas.current.isEmpty()) {
        setError("Por favor agregue su firma");
        return;
      }

      const signatureDataUrl = sigCanvas.current.toDataURL("image/png");

      signatureSaved = await saveSessionSignature({
        signatureDataUrl,
      });
    }

    if (!signatureSaved) return;

    const success = await signAllContracts({
      acceptedTerms,
      signedName,
    });

    if (success) {
      setAcceptedTerms(false);
      setIsSuccess(true);
      sigCanvas.current?.clear();

      setTimeout(() => {
        setIsSuccess(false);
      }, 1100);
    }
  };

  return (
    <section className="flex flex-col gap-2 mb-100">
      {error && <p className="text-red-600">{error}</p>}

      {!sessionSignatureDataUrl && (
        <div className="bg-white border-2 border-black my-40">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{
              width: 800,
              height: 120,
              className: "sigCanvas w-full",
            }}
          />
        </div>
      )}

      {sessionSignatureDataUrl && (
        <p className="text-green-600 text-center">
          Firma guardada — confirme todos los contratos
        </p>
      )}

      <div className="flex w-full justify-center gap-2">
        <button
          onClick={handleValidate}
          disabled={pdfLoading}
          className="button-generic text-[1.5em] flex-1"
        >
          Confirmar y firmar
        </button>

        {!sessionSignatureDataUrl && (
          <button
            onClick={clear}
            type="button"
            disabled={pdfLoading}
            className="text-[1.5em] button-generic-red flex-1"
          >
            Borrar
          </button>
        )}
      </div>
    </section>
  );
};

export default SignatureBlock;