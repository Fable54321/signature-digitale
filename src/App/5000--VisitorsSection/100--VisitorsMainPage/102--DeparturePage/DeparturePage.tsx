import { useEffect, useState } from "react";
import { useVisitors } from "../../Contexts/VisitorsContext/UseVisitors";


const DeparturePage = () => {


  const { fetchActiveVisits, activeVisits } = useVisitors();

    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedVisitId, setSelectedVisitId] = useState<number | null>(null);
    const [isFullNameOpen, setIsFullNameOpen] = useState(false);

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
      if (
        selectedVisitId !== null &&
        !activeVisits.some((visit) => visit.id === selectedVisitId)
      ) {
        setSelectedVisitId(null);
      }
    }, [activeVisits, selectedVisitId]);

    const selectedVisit = activeVisits.find((visit) => visit.id === selectedVisitId);

  return (
    <section className="flex flex-col items-center">
      <div className="mt-10 flex items-center text-[1.5em] font-secondary font-bold gap-2 w-[98%] justify-center">
        <p>Je :</p>
        <div className="relative w-[60%]">
          <button
            type="button"
            onClick={() => {
              if (activeVisits.length > 0) {
                setIsFullNameOpen((prev) => !prev);
              }
            }}
            className="w-full px-2 pr-12 text-center bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary rounded-lg disabled:bg-gray-100 disabled:text-gray-500"
            aria-haspopup="listbox"
            aria-expanded={isFullNameOpen}
            disabled={activeVisits.length === 0}
          >
            {selectedVisit?.full_name || (activeVisits.length > 0 ? "Sélectionnez votre nom" : "Aucun visiteur actif")}
            <span className="absolute right-4 top-1/2 -translate-y-1/2">▾</span>
          </button>

          {isFullNameOpen && (
            <div className="absolute z-50 mt-1 w-full bg-white border-2 border-secondary rounded-lg shadow-lg overflow-hidden text-[0.65em]">
              {activeVisits.map((visit) => (
                <button
                  key={visit.id}
                  type="button"
                  onClick={() => {
                    setSelectedVisitId(visit.id);
                    setIsFullNameOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-3 ${
                    selectedVisitId === visit.id
                      ? "bg-secondary text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {visit.full_name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
        <p className="text-[2em] mt-5 font-secondary">Confirme avoir quitter à :</p>
       <p className="text-[3em] font-bold">{currentTime.toLocaleTimeString()}</p>
    </section>
  )
}

export default DeparturePage
