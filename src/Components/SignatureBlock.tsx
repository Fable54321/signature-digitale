import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas'

const SignatureBlock = () => {


    const sigCanvas = useRef<SignatureCanvas>(null);

    const clear = () => {

        if (!sigCanvas.current) {
            return;
        }

        sigCanvas.current.clear();
    }


  return (
    <>
    <div className='bg-white border-2 border-black mt-2'>
       <SignatureCanvas ref={sigCanvas} penColor='green'
    canvasProps={{width: 800, height: 120, className: 'sigCanvas'}} />
    </div>
    <button onClick={clear} className='button-generic-red'>Effacer</button>
    </>
  )
}

export default SignatureBlock
