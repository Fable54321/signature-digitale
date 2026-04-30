import { Outlet } from "react-router-dom"



const VisitorsMainPage = ( { token } : { token: string } ) => {
  return (
    <article className="pt-2 flex flex-col items-center font-secondary pb-4 max-sm[0.85rem]">
      <h2 className="text-[3em] font-primary text-secondary font-bold text-center">Registre des visiteurs</h2>
      <Outlet context={{ token }} />
    </article>
  )
}

export default VisitorsMainPage
