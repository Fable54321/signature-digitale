import { useEffect, useState } from "react";


const DeparturePage = () => {

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    

  return (
    <section className="flex flex-col items-center">
       {currentTime.toLocaleTimeString()}
    </section>
  )
}

export default DeparturePage
