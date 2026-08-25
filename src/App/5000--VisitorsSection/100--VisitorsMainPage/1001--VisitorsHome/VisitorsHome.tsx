import { Link } from "react-router-dom"
import { ArrowRight, LogIn, LogOut } from "lucide-react"
import vegibecLogo from '../../../../assets/vegibec.png'
import { useLanguage } from "../../Contexts/VisitorsContext/LanguageContext";





const VisitorsHome = () => {

const { text } = useLanguage();




  return (
    <section className="relative flex flex-col items-center gap-10 w-[min(98%,800px)] ">
        <img src={vegibecLogo} alt="Vegibec Logo" className=' w-80 mt-10 tablet:w-150' />
       <div className="flex flex-col  gap-4 w-full">
      <Link to="arrivee"  className="bg-secondary font-primary font-bold rounded-sm py-1 px-5 text-white text-[2.9em] tablet:text-[4.5em] flex items-center justify-between gap-4" >
        <span className="flex items-center gap-4">
          <span className="flex h-[1.2em] w-[1.2em] items-center justify-center rounded-full bg-tertiary p-3 text-secondary">
            <LogIn className="h-full w-full" strokeWidth={2.5} />
          </span>
          {text.arrival}
        </span>
        <ArrowRight className="h-[0.8em] w-[0.8em]" strokeWidth={2.5} />
      </Link>
      <Link to="depart" className="bg-secondary font-primary font-bold rounded-sm py-1 px-5 text-white text-[2.9em] tablet:text-[4.5em] flex items-center justify-between gap-4">
        <span className="flex items-center gap-4">
          <span className="flex h-[1.2em] w-[1.2em] items-center justify-center rounded-full bg-tertiary p-3 text-secondary">
            <LogOut className="h-full w-full" strokeWidth={2.5} />
          </span>
          {text.departure}
        </span>
        <ArrowRight className="h-[0.8em] w-[0.8em]" strokeWidth={2.5} />
      </Link>
      </div> 

    

    </section>
  )
}

export default VisitorsHome
