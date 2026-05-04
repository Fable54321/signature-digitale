import { Link } from "react-router-dom"
import vegibecLogo from '../../../../assets/vegibec.png'

const VisitorsHome = () => {
  return (
    <section className="flex flex-col items-center gap-10 w-[min(98%,500px)] ">
        <img src={vegibecLogo} alt="Vegibec Logo" className=' w-80 mt-10 tablet:w-150' />
       <div className="flex flex-col  gap-4 w-full">
      <Link to="arrivee"  className="bg-secondary font-primary font-bold rounded-sm py-1 text-center text-white text-[2.9em] " >J'arrive</Link>
      <Link to="depart" className="bg-secondary font-primary font-bold rounded-sm py-1 text-center text-white text-[2.9em]">Je quitte</Link>
      </div> 
    </section>
  )
}

export default VisitorsHome
