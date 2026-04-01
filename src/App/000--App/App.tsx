import vegibecLogo from '../../assets/vegibec.png'
import NumPad from '../../Components/NumPad'


function App() {
  

  return (
    <article className='flex flex-col items-center gap-2 font-secondary md:text-[1rem] text-[0.9rem]' >
      <div className='mt-30'>
        <img src={vegibecLogo} alt="Vegibec Logo" className='w-70 sm:w-80 ' />
      </div>
      <h1 className='font-primary font-bold text-[1.8em]'>Appli de signature digitale</h1>
      <NumPad />
    </article>
  )
}

export default App
