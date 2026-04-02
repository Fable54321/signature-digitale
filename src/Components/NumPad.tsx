import { useEffect, useState } from "react";
import { Delete } from "lucide-react"
import { useForeignWorker } from "../Contexts/ForeignWorkerContext";
import { useNavigate } from "react-router-dom";


const NumPad = () => {

const [currentPin, setCurrentPin] = useState<number[]>([]);

const { lookupByPin, pin, setPin, getCurrentWorker } = useForeignWorker();

const navigate = useNavigate();






const handleAddNumber = (NumEntered: number) => () => {
    
    if (currentPin.length === 5) {
        alert("No puedes introducir más de 5 números");
    }


    setCurrentPin([...currentPin, NumEntered]);

    
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

    lookupByPin(pin);
    getCurrentWorker();

    navigate("/contrat");
    
}









// const formattedPin = useMemo(() => {
//   return Number(currentPin.join(''));
// }, [currentPin]);


useEffect(() => {
  const formattedPin = currentPin.join('');
  setPin(formattedPin);
}, [currentPin, setPin]);





  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="font-medium text-[1.9em]">Introduce tu PIN</h2>

      <p className=" flex items-center justify-center border-2 text-[5em] border-gray-400 rounded-lg w-[min(98%,600px)] tracking-widest text-center h-27">{currentPin}</p>

      <form onSubmit={(e) => handleSubmit(e)} className="w-full flex flex-col items-center gap-2" >
          <div className="grid grid-cols-3 w-[min(98%,600px)] gap-x-2 gap-y-4 mt-4">
        <button type="button" onClick={handleAddNumber(1)} className="border border-gray-600 bg-gray-300 text-[4em] hover:cursor-pointer active:scale-95 active:bg-blue-200">1</button>
        <button type="button" onClick={handleAddNumber(2)} className="border border-gray-600 bg-gray-300 text-[4em] hover:cursor-pointer active:scale-95 active:bg-blue-200">2</button>
        <button type="button" onClick={handleAddNumber(3)} className="border border-gray-600 bg-gray-300 text-[4em] hover:cursor-pointer active:scale-95 active:bg-blue-200">3</button>
        <button type="button" onClick={handleAddNumber(4)} className="border border-gray-600 bg-gray-300 text-[4em] hover:cursor-pointer active:scale-95 active:bg-blue-200">4</button>
        <button type="button" onClick={handleAddNumber(5)} className="border border-gray-600 bg-gray-300 text-[4em] hover:cursor-pointer active:scale-95 active:bg-blue-200">5</button>
        <button type="button" onClick={handleAddNumber(6)} className="border border-gray-600 bg-gray-300 text-[4em] hover:cursor-pointer active:scale-95 active:bg-blue-200">6</button>
        <button type="button" onClick={handleAddNumber(7)} className="border border-gray-600 bg-gray-300 text-[4em] hover:cursor-pointer active:scale-95 active:bg-blue-200">7</button>
        <button type="button" onClick={handleAddNumber(8)} className="border border-gray-600 bg-gray-300 text-[4em] hover:cursor-pointer active:scale-95 active:bg-blue-200">8</button>
        <button type="button" onClick={handleAddNumber(9)} className="border border-gray-600 bg-gray-300 text-[4em] hover:cursor-pointer active:scale-95 active:bg-blue-200">9</button>
        <button type="button" onClick={() => setCurrentPin([])} className="bg-red-500 hover:cursor-pointer active:scale-95 text-[4em] text-white">X</button>
        <button type="button" onClick={handleAddNumber(0)} className="  border border-gray-600 bg-gray-300 text-[4em] hover:cursor-pointer active:scale-95 active:bg-blue-200">0</button>
        <button type="button" onClick={() => setCurrentPin(currentPin.slice(0, -1))} className="bg-yellow-400 hover:cursor-pointer active:scale-95 text-[4em] text-white flex justify-center items-center"><Delete size={90} /></button>
        
      </div>
      <button className="button-generic text-[4em] w-[min(98%,600px)]" type="submit">confirmar</button>
      </form>
    </section>
  )
}

export default NumPad
