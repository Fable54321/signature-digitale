import { Link } from "react-router-dom"
import vegibecLogo from '../../../../assets/vegibec.png'

const VisitorsHome = () => {
  return (
    <section className="flex flex-col items-center gap-10 w-[min(98%,400px)]">
        <img src={vegibecLogo} alt="Vegibec Logo" className='w-70 sm:w-80 mt-10' />
       <div className="flex flex-col  gap-4 w-full">
      <Link to="arrivee"  className="button-generic text-[2.5em]" >J'arrive</Link>
      <Link to="depart" className="button-generic text-[2.5em]">Je quitte</Link>
      </div> 
    </section>
  )
}

export default VisitorsHome
