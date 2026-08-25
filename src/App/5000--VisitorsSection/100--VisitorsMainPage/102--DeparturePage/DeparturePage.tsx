import { useEffect, useState } from "react";
import Spinner from "../../../../Components/Spinner";
import VisitorsSignatureBlock from "../../Components/VisitorsSignatureBlock";
import { useVisitors } from "../../Contexts/VisitorsContext/UseVisitors";
import { scrollToBottom } from "../../../../Utils/scrollToBottom";
import { CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../Contexts/VisitorsContext/LanguageContext";

const DeparturePage = () => {
  const { language, text } = useLanguage();
  const {
    fetchActiveVisits,
    activeVisits,
    activeVisitsLoading,
    activeVisitsError,
    endVisitorSession,
    endVisitorSessionLoading,
  } = useVisitors();

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

  useEffect(() => {
    if(selectedVisit){
      scrollToBottom()
    }
  },[selectedVisit])

  const navigate = useNavigate();

  const handleNavigateHome = () => {
  navigate("/visiteurs");
}

  const handleDepartureSubmit = async (signatureDataUrl: string) => {
    if (!selectedVisit) return;

    await endVisitorSession({
      id: selectedVisit.id,
      departure_time: new Date().toISOString(),
      signatureDataUrl,
    });
  };

  if (endVisitorSessionLoading) {
    return <Spinner />;
  }

  return (
    <>
    <section className="flex flex-col items-center w-full gap-4">
      <div
        className="mt-10 flex items-center text-[2em]
      text-secondary
      font-secondary font-bold gap-2 w-[60%] justify-center "
      >
        <p>{text.iAm}</p>
        <div className="relative w-[60%]">
          <button
            type="button"
            onClick={() => {
              if (activeVisits.length > 0) {
                setIsFullNameOpen((prev) => !prev);
              }
            }}
            className="w-full px-2 pr-12 text-center bg-white
             text-secondary border border-gray-300 focus:outline-none focus:ring-2
              focus:ring-secondary rounded-lg disabled:bg-gray-100
              py-1
               disabled:text-gray-500"
            aria-haspopup="listbox"
            aria-expanded={isFullNameOpen}
            disabled={activeVisits.length === 0}
          >
            {selectedVisit?.full_name ||
              (activeVisits.length > 0
                ? text.selectName
                : text.noActiveVisitor)}
            <span className="absolute right-4 top-1/2 -translate-y-1/2">▼</span>
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

      {activeVisitsLoading && <Spinner />}
      {activeVisitsError && (
        <p className="text-red-500 text-center text-[1.2em]">{text.activeVisitsError}</p>
      )}

      <div className="flex flex-col items-center p-3 bg-white rounded-lg">
        <p className="text-[2em] mt-5 font-secondary">{text.confirmDeparture}</p>
        <p className="text-[3em] font-bold">{currentTime.toLocaleTimeString(language === "fr" ? "fr-CA" : language)}</p>
      </div>

      {selectedVisit && (
        <div className="w-[min(98%,800px)]">
          <VisitorsSignatureBlock onValidate={handleDepartureSubmit} />
        </div>
      )}
      
    </section>
     <button onClick={handleNavigateHome} className="text-red-600  mt-70 -mb-70">
      <CircleX strokeWidth={2.5} size={64} />
    </button>
    </>
  );
};

export default DeparturePage;
