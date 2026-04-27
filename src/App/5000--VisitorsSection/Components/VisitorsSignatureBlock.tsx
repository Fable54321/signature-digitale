import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";




const VisitorsSignatureBlock = () => {
  const sigCanvas = useRef<SignatureCanvas | null>(null);

 

  const clear = () => {
    if (!sigCanvas.current) return;
    sigCanvas.current.clear();
  };

  const handleValidate = async () => {
if(!sigCanvas.current){
    return;
}

    // const signatureDataUrl = sigCanvas.current.toDataURL("image/png");

   

   
  };

  return (

    <section className="flex flex-col gap-2 mb-10">
      
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

      <div className="flex w-full justify-center gap-2">
        <button
          onClick={handleValidate}
          
          className="button-generic text-[1.5em] flex-1"
        >
          Confirmer
        </button>

        <button
          onClick={clear}
          type="button"
          
          className="text-[1.5em] button-generic-red flex-1"
        >
          Effacer
        </button>
      </div>
    </section>
  );
};

export default VisitorsSignatureBlock;