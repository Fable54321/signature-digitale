import { Outlet } from "react-router-dom"
import { useLocation } from "react-router-dom"
import SuccesBox from "../Components/SuccesBox";
import { useVisitors } from "../Contexts/VisitorsContext/UseVisitors";



const VisitorsMainPage = ( { token } : { token: string } ) => {


const location = useLocation();

const { sessionSubmissionSuccess } = useVisitors();

if (sessionSubmissionSuccess) {
  return <SuccesBox  />;
}


  return (
    <article className={`relative flex flex-col items-center font-secondary pb-4 max-sm[0.85rem] lg:mt-0 tablet:justify-center tablet:min-h-screen  ${location.pathname === '/visiteurs' ? 'tablet:-mt-5' : ''}`}>
      <h2 className="text-[3.5em] font-bold font-primary text-secondary text-center">Registre des visiteurs</h2>
       <Outlet />
    </article>
  )
}

export default VisitorsMainPage
