import { useLayoutEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useLanguage } from "../Contexts/VisitorsContext/LanguageContext";

type Props = {
  onValidate: (signatureDataUrl: string) => Promise<void> | void;
};

const VisitorsSignatureBlock = ({ onValidate }: Props) => {
  const { text } = useLanguage();
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const canvasContainer = useRef<HTMLDivElement | null>(null);

  const [signatureError, setSignatureError] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(800);

  useLayoutEffect(() => {
    const updateCanvasWidth = () => {
      const width = canvasContainer.current?.clientWidth;

      if (width) {
        setCanvasWidth(Math.floor(width));
      }
    };

    updateCanvasWidth();

    const resizeObserver = new ResizeObserver(updateCanvasWidth);

    if (canvasContainer.current) {
      resizeObserver.observe(canvasContainer.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const clear = () => {
    sigCanvas.current?.clear();
  };

  const handleValidate = async () => {
    if (!sigCanvas.current) return;

    if (sigCanvas.current.isEmpty()) {
      setSignatureError(true);
      return;
    }

    const signatureDataUrl = sigCanvas.current.toDataURL("image/png");

    setSignatureError(false);

    await onValidate(signatureDataUrl);
  };

  return (
    <section className="flex flex-col gap-2 mb-10">
      <div ref={canvasContainer} className="bg-white border-2 border-black mt-40">
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{
            width: canvasWidth,
            height: 120,
            className: "sigCanvas block w-full h-[120px]",
          }}
        />
          
      </div>
    
     {signatureError && (
        <p className="text-red-500 text-center mt-2">
          {text.signatureRequired}
        </p>
      )}

      <div className="mb-30"></div>

      <div className="flex w-full justify-center gap-2">
        <button
          onClick={handleValidate}
          type="button"
          className="button-generic text-[1.5em] flex-1"
        >
          {text.confirm}
        </button>

        <button
          onClick={clear}
          type="button"
          className="text-[1.5em] button-generic-red flex-1"
        >
          {text.clear}
        </button>
      </div>
     
    </section>
  );
};

export default VisitorsSignatureBlock;
