
import { Check } from "lucide-react";
import "./CSS/SignatureSuccess.css"




const SignatureSuccess = () => {




  return (



    (



    <section className="slide-in flex flex-col items-center absolute z-10 top-1/7 left-1/2 -translate-x-1/2 bg-white rounded-3xl  shadow-2xl w-[min(98%,400px)] py-10 ">

        <h3 className="px-6 font-bold font-tertiary text-[3em] text-center ">La firma se ha registrado correctamente.</h3>
     <div className="relative flex justify-center items-center w-40 h-40 rounded-full bg-tertiary shadow-xl mt-8">
        
      <Check className="text-primary  " size={104} />
     </div>
     
   
    </section>
  )
)
}

export default SignatureSuccess
