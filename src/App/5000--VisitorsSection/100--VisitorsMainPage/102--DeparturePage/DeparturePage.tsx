import { useEffect, useState } from "react";
import { useVisitors } from "../../Contexts/VisitorsContext/UseVisitors";


const DeparturePage = () => {


  const { fetchActiveVisits, activeVisits } = useVisitors();

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);


    useEffect(() => {
     void fetchActiveVisits();
    }, [fetchActiveVisits]);

    useEffect(() => {
      console.log(activeVisits);
    }, [activeVisits]);

  return (
    <section className="flex flex-col items-center">
      <div className="mt-10 flex items-center text-[4em] font-secondary font-bold">
        <p>Je :</p>
        <select>
          {activeVisits.map((visit, index) => (
            <option key={index} value={visit.full_name}>
              {visit.full_name}
            </option>
          ))}
        </select>
      </div>
        <p className="text-[2em] mt-5 font-secondary">Confirme avoir quitter à :</p>
       <p className="text-[2em]">{currentTime.toLocaleTimeString()}</p>
    </section>
  )
}

export default DeparturePage
