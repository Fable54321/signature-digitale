import { useEffect, useMemo, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import GreenDots from './GreenDots'
import buildingsList from '../../assets/data/buildingsList'

const normalizeSearch = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const SitesPlan = () => {
  const [searchParams] = useSearchParams();
  const planUrl = searchParams.get('planUrl');

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

  const dotRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [searchInput, setSearchInput] = useState('');
  const [pendingScrollSlug, setPendingScrollSlug] = useState<string | null>(null);
  
  useEffect(() => {
    if (!pendingScrollSlug || !showDots[pendingScrollSlug]) {
      return;
    }

    dotRefs.current[pendingScrollSlug]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
    setPendingScrollSlug(null);
  }, [pendingScrollSlug, showDots]);

  const handleToggleDot = (slug: string) => {
    const nextValue = !showDots[slug];

    setShowDots({ ...showDots, [slug]: nextValue });

    if (nextValue) {
      setPendingScrollSlug(slug);
    }
  };
 
  

  const filteredBuildings = useMemo(() => {
    const search = normalizeSearch(searchInput);

    return buildingsList.filter((building) => {
      const matchesSearch =
        search !== '' &&
        (normalizeSearch(building.slug).includes(search) || normalizeSearch(building.name).includes(search));

      return matchesSearch || showDots[building.slug];
    });
  }, [searchInput, showDots]);

  return (
    <article className="flex flex-col items-center gap-6 pb-10">
      {!planUrl && (
        <p className="text-[1.6em] font-bold text-secondary text-center">
          Lien du plan invalide ou expiré.
        </p>
      )}

      {planUrl && <section className='flex flex-col items-center'>
        <div className='relative fade-image'>
        <img className='' src={planUrl} alt="Plan aérien du 171, rang ste-Sophie" />
          <GreenDots showDots={showDots} dotRefs={dotRefs} />
        </div>
      </section>}
      {planUrl && <section className='flex flex-col items-center gap-4'>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Rechercher..."
          className='border rounded-lg py-1 px-2 text-[1.4em]'
        />
        {filteredBuildings.length > 0 && <ul className='grid grid-cols-2 md:grid-cols-3 gap-2'>
          {filteredBuildings.map((building) => {
            return (
              <li key={building.slug} className=' w-full'>
                <button className={`px-4 py-2 w-full rounded hover:cursor-pointer ${showDots[building.slug] ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'}`} onClick={() => handleToggleDot(building.slug)}>{building.slug + ' - '}{building.name}</button>
              </li>
            )
          })}
        </ul>}
      </section>}
    </article>
  )
}



export default SitesPlan

