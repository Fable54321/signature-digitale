import type { Worker } from "../Contexts/ForeignWorkerContext";
import { ShieldCheck, UserRound, CalendarDays } from "lucide-react";

type IdentityConfirmationProps = {
    worker: Worker;
    setIsIdentityConfirmed: (confirmed: boolean) => void;

}

const IdentityConfirmation = ({ worker, setIsIdentityConfirmed }: IdentityConfirmationProps) => {
  return (
    <section className="flex flex-col items-center absolute z-10 top-1/4 left-1/2 -translate-x-1/2 bg-white rounded-3xl border-secondary shadow-2xl w-[min(98%,580px)] ">
     <div className="relative flex justify-center items-center w-20 h-20 rounded-full bg-tertiary shadow-xl mt-8">
      <ShieldCheck className="text-primary  " size={64} />
     </div>
    <form className="  flex flex-col items-center gap-5 py-4 px-8">
       
      <p className=" font-primary font-bold text-[2.5em] text-center">¿Esto datos son correctos?</p>
        <ul className="flex flex-col  w-full mt-4">
            <li className="text-[1.5em]">
  <div className="flex items-center justify-between text-secondary bg-blue-50 border border-gray-200 py-6 px-5 rounded-tl-md rounded-tr-md">
    <div className="flex items-center gap-2">
    <div className="relative flex justify-center items-center px-2 py-2 rounded-full bg-tertiary shadow-xl ">
      <UserRound className="text-primary  " size={30} />
     </div>
    <span className="underline">Nombre:</span>
    </div>
    <span className="text-black font-bold text-[1.1em] no-underline">
      {worker?.name}
    </span>
  </div>
</li>

<li className="text-[1.5em]">
  <div className="flex items-center justify-between text-secondary bg-blue-50 border border-gray-200 py-6 px-5  ">
     <div className="flex items-center gap-2">
    <div className="relative flex justify-center items-center px-2 py-2 rounded-full bg-tertiary shadow-xl ">
      <UserRound className="text-primary  " size={30} />
     </div>
    <span className="underline">Apellidos:</span>
    </div>
    <span className="text-black font-bold text-[1.1em] no-underline">
      {worker?.surname}
    </span>
  </div>
</li>

<li className="text-[1.5em]">
  <div className="flex items-center justify-between text-secondary bg-blue-50 border border-gray-200 py-6 px-5 rounded-bl-md rounded-br-md">
      <div className="flex items-center gap-2">
    <div className="relative flex justify-center items-center px-2 py-2 rounded-full bg-tertiary shadow-xl ">
      <CalendarDays className="text-primary  " size={30} />
     </div>
    <span className="underline">Fecha de nacimiento:</span>
    </div>
    <span className="text-black font-bold text-[1.1em] no-underline">
      {worker?.birth_date?.slice(0, 10)}
    </span>
  </div>
</li>
        </ul>    
      <button className=" mb-2 w-full button-generic-light text-[2em] shadow-2xl " type="button" onClick={() => setIsIdentityConfirmed(true)}>Confirmo los datos</button>
    </form>
    </section>
  )
}

export default IdentityConfirmation
