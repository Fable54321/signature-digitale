import ChecklistBox from "./101--ChecklistBox/ChecklistBox"


const VisitorsMainPage = () => {
  return (
    <article className="pt-2 flex flex-col items-center font-secondary pb-4">
      <h2 className="text-[3em] font-primary text-secondary font-bold text-center">Registre des visiteurs</h2>
      <ChecklistBox />
    </article>
  )
}

export default VisitorsMainPage
