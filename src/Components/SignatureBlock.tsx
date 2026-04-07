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
    <section className='flex flex-col gap-2'>
    <div className='bg-white border-2 border-black mt-4'>
       <SignatureCanvas ref={sigCanvas} penColor='green'
    canvasProps={{width: 800, height: 120, className: 'sigCanvas'}} />
    </div>
    <div className='flex w-full justify-center gap-2'>
      <button className='button-generic  text-[1.5em] flex-1'>Validar</button>
      <button onClick={clear} className=  ' text-[1.5em] button-generic-red flex-1'>Borrar</button>
    </div>
    </section>
  )
}

export default SignatureBlock
