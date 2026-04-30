import { useMemo, useState } from 'react'
import plan from '../../assets/images/1777456864065-7231d062-1073-44d2-a4d6-6d346233fa41_1_upscayl_4x_upscayl-standard-4x.png'
import GreenDots from './GreenDots'
import buildingsList from '../../assets/data/buildingsList'

const SitesPlan = () => {
  const [showDots, setShowDots] = useState<Record<string, boolean>>({
    '52': false,
    '53': false,
    'E': false,
    'D': false,
    'C': false,
    'B': false,
    'A': false,
    '18': false,
    '17': false,
    '16': false,
    '14': false,
    '13': false,
    '12': false,
    '15': false,
    'Q': false,
    'P': false,
    'O': false,
    'N': false,
    'M': false,
    '11': false,
    '8': false,
    '7': false,
    '6': false,
    '5': false,
    '2': false,
    '19': false,
    '21': false,
    '22': false,
    '23': false,
    '24': false,
    '26': false,
    '25': false,
    '20': false,
    'F': false,
    'G': false,
    'H': false,
    'I': false,
    'J': false,
    'K': false,
    'L': false,
    '27': false,
    '28': false,
    '29': false,
    '30': false,
    '31': false,
    '32': false,
    '33': false,
    '34': false,
    '35': false,
    '36': false,
    '37': false,
    '38': false,
    '39': false,
    '40': false,
    '41': false,
    '42': false,
    '46': false,
    '45': false,
    '44': false,
    '51': false,
    '49': false,
    '50': false,
    'V': false,
    'U': false,
    'T': false,
    'S': false,
    'R': false,
    '48': false
  })

  const [searchInput, setSearchInput] = useState('');
  
 

   const filteredBuildings = useMemo(() => {
    return buildingsList.filter((building) => {
      return building.slug.toLowerCase().normalize().includes(searchInput.normalize().toLowerCase()) || building.name.normalize().toLowerCase().includes(searchInput.toLowerCase().normalize());
    });
  }, [searchInput]);

  return (
    <article className="flex flex-col items-center gap-3 pb-4">

      <section className='flex flex-col items-center'>
        <div className='relative fade-image'>
        <img className='' src={plan} alt="Plan aérien du 171, rang ste-Sophie" />
          <GreenDots showDots={showDots} />
        </div>
      </section>
      <section className='flex flex-col items-center gap-4'>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Rechercher..."
          className='border rounded-lg py-1 px-2 text-[1.2em]'
        />
        {searchInput && searchInput !== '' && <ul className='grid grid-cols-2 md:grid-cols-3 gap-2'>
          {filteredBuildings.map((building) => {
            return (
              <li key={building.slug} className=' w-full'>
                <button className={`px-4 py-2 w-full rounded ${showDots[building.slug] ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'}`} onClick={() => setShowDots({ ...showDots, [building.slug]: !showDots[building.slug] })}>{building.slug + ' - '}{building.name}</button>
              </li>
            )
          })}
        </ul>}
      </section>
    </article>
  )
}

export default SitesPlan
