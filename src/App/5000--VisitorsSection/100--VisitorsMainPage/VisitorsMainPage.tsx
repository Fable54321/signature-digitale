import { Outlet } from "react-router-dom"
import { useLocation } from "react-router-dom"
import SuccesBox from "../Components/SuccesBox";
import { useVisitors } from "../Contexts/VisitorsContext/UseVisitors";
import vegibecFlower from '../assets/images/vegibec_flower.png'
import { useLanguage } from "../Contexts/VisitorsContext/LanguageContext";
import type { VisitorLanguage } from "../Contexts/VisitorsContext/LanguageContext";

const languages: { code: VisitorLanguage; label: string }[] = [
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
];


const VisitorsMainPage = ( ) => {


const location = useLocation();

const { sessionSubmissionSuccess } = useVisitors();
const { language, setLanguage, text } = useLanguage();

if (sessionSubmissionSuccess) {
  return <SuccesBox  />;
}


  return (
    <>

    <div className="relative w-full flex justify-between px-4 top-5 mb-3">
      {languages
        .filter(({ code }) => code !== language)
        .map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          className="bg-secondary text-white p-2 text-[1.4rem] rounded-sm font-primary active:scale-75 cursor-pointer"
        >
          {label}
        </button>
      ))}
      </div>
    <article className={`relative flex flex-col items-center font-secondary pb-4 max-sm[0.85rem] lg:mt-0 tablet:justify-center w-full tablet:min-h-screen  ${location.pathname === '/visiteurs' ? 'tablet:-mt-12' : ''}`}>
      
  { location.pathname === '/visiteurs' &&
  <>   
   <div className="relative ">
          <div className="absolute top-1/2 -translate-y-1/2 right-40 w-[120%] h-0.5 bg-linear-to-r from-secondary/20 to-secondary"></div>
        <img src={vegibecFlower} alt="Vegibec Flower" className="w-35"  />
        <div className="absolute top-1/2 -translate-y-1/2 left-40 w-[120%] h-0.5 bg-linear-to-r from-secondary to-secondary/20"></div>
</div>
<div className="relative mb-10">
      <h2 className="text-[3.5em] font-bold font-primary text-secondary text-center leading-tight">{text.registryTitle}</h2>
      <div className="bg-linear-to-r from-secondary/20 to-secondary rounded-full h-0.5 w-[25%] absolute right-[42%] top-[145%] -translate-y-1/2 -translate-x-1/2"></div>
      <div className="bg-secondary rounded-full h-2.5 w-2.5 absolute left-1/2 top-[145%] -translate-y-1/2 -translate-x-1/2"></div>
      <div className="bg-linear-to-r from-secondary to-secondary/20 rounded-full h-0.5 w-[25%] absolute left-[67%] top-[145%] -translate-y-1/2 -translate-x-1/2"></div>
      </div>
      </>}
       <Outlet />
    </article>

    </>
  )
}

export default VisitorsMainPage
