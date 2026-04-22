import vegibecLogo from '../../assets/vegibec.png'
import NumPad from '../../Components/NumPad'


function App() {
  

  return (
    <article className='flex flex-col items-center gap-2 font-secondary md:text-[1rem] text-[0.9rem] h-[90vh] justify-center' >
      <div className='mt-27'>
        <img src={vegibecLogo} alt="Vegibec Logo" className='w-70 sm:w-80 ' />
      </div>
      <NumPad />
    </article>
  )
}

export default App
