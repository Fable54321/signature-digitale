import success from "../assets/images/check.png"


const SuccesBox = () => {
  return (
    <div className="test px-8 w-[min(98%,500px)] absolute z-51 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border-4 flex flex-col items-center gap-8 py-4 border-secondary border-t-0 border-r-0 border-b-8 bg-white rounded-3xl">
      <p className="bg-tertiary rounded-xl  text-center font-primary font-bold text-secondary text-[2.5em] ">Les informations du visiteurs ont été enregistrées avec succès</p>
      <img className="bg-tertiary p-1 rounded-xl" src={success} alt="Success" />
    </div>
  )
}

export default SuccesBox
