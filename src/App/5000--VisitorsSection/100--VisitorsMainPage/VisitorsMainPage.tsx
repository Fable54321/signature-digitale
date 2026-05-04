import { Outlet } from "react-router-dom"



const VisitorsMainPage = ( { token } : { token: string } ) => {
  return (
    <article className=" flex flex-col items-center font-secondary pb-4 max-sm[0.85rem] lg:mt-0 tablet:justify-center tablet:min-h-screen tablet:-mt-5">
      <h2 className="text-[3.5em] font-bold font-primary text-secondary text-center">Registre des visiteurs</h2>
      <Outlet context={{ token }} />
    </article>
  )
}

export default VisitorsMainPage
