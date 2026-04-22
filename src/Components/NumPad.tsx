import { useEffect, useState } from "react";
import { Delete } from "lucide-react";
import { useForeignWorker } from "../Contexts/ForeignWorkerContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import "./CSS/Numpad.css";

const NumPad = () => {
  const [currentPin, setCurrentPin] = useState<number[]>([]);

  const { user } = useAuth();
  const { lookupByPin, pin, setPin } = useForeignWorker();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(user?.appAccess);
  }, [user]);

  const handleAddNumber = (numEntered: number) => () => {
    setCurrentPin((prev) => {
      if (prev.length === 5) {
        alert("No puedes introducir más de 5 números");
        return prev;
      }

      return [...prev, numEntered];
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (pin.length !== 5) {
      alert("El PIN debe contener 5 números");
      return;
    }

    const success = await lookupByPin(pin);

    if (!success) {
      return;
    }

    navigate("/contrat");
  };

  useEffect(() => {
    const formattedPin = currentPin.join("");
    setPin(formattedPin);
  }, [currentPin, setPin]);

  return (
    <section className="desktop-quick w-full flex flex-col items-center relative">
      <h2 className="font-medium text-[1.9em]">Introduce tu PIN</h2>
<div className="w-[min(98%,900px)] flex flex-col items-center">
      <p className="flex items-center bg-white justify-center border-2 text-[9em] border-gray-400 rounded-lg w-full tracking-widest leading-none py-1 text-center ">
        {currentPin.join("")}
      </p>

      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-2">
        <div className="grid grid-cols-3 w-full  gap-x-2 gap-y-4 mt-4">
          <button type="button" onClick={handleAddNumber(1)} className="border border-gray-600 bg-gray-300 text-[7em] hover:cursor-pointer active:scale-95 active:bg-blue-200">1</button>
          <button type="button" onClick={handleAddNumber(2)} className="border border-gray-600 bg-gray-300 text-[7em] hover:cursor-pointer active:scale-95 active:bg-blue-200">2</button>
          <button type="button" onClick={handleAddNumber(3)} className="border border-gray-600 bg-gray-300 text-[7em] hover:cursor-pointer active:scale-95 active:bg-blue-200">3</button>
          <button type="button" onClick={handleAddNumber(4)} className="border border-gray-600 bg-gray-300 text-[7em] hover:cursor-pointer active:scale-95 active:bg-blue-200">4</button>
          <button type="button" onClick={handleAddNumber(5)} className="border border-gray-600 bg-gray-300 text-[7em] hover:cursor-pointer active:scale-95 active:bg-blue-200">5</button>
          <button type="button" onClick={handleAddNumber(6)} className="border border-gray-600 bg-gray-300 text-[7em] hover:cursor-pointer active:scale-95 active:bg-blue-200">6</button>
          <button type="button" onClick={handleAddNumber(7)} className="border border-gray-600 bg-gray-300 text-[7em] hover:cursor-pointer active:scale-95 active:bg-blue-200">7</button>
          <button type="button" onClick={handleAddNumber(8)} className="border border-gray-600 bg-gray-300 text-[7em] hover:cursor-pointer active:scale-95 active:bg-blue-200">8</button>
          <button type="button" onClick={handleAddNumber(9)} className="border border-gray-600 bg-gray-300 text-[7em] hover:cursor-pointer active:scale-95 active:bg-blue-200">9</button>

          <button
            type="button"
            onClick={() => setCurrentPin([])}
            className="bg-red-500 hover:cursor-pointer active:scale-95 text-[7em] text-white"
          >
            X
          </button>

          <button
            type="button"
            onClick={handleAddNumber(0)}
            className="border border-gray-600 bg-gray-300 text-[7em] hover:cursor-pointer active:scale-95 active:bg-blue-200"
          >
            0
          </button>

          <button
            type="button"
            onClick={() => setCurrentPin((prev) => prev.slice(0, -1))}
            className="bg-yellow-400 hover:cursor-pointer active:scale-95 text-[7em] text-white flex justify-center items-center"
          >
            <Delete size={90} />
          </button>
        </div>

        <button className="button-generic text-[7em] w-full" type="submit">
          confirmar
        </button>
      </form>
      </div>
    </section>
  );
};

export default NumPad;