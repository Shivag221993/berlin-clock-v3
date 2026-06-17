import { useEffect, useState } from 'react';
import { MILLISECONDS_PER_SECOND } from '../constants';

export interface CurrentTime {
  hours: number;
  minutes: number;
  seconds: number;
}

function getSystemTime(): CurrentTime {
  const currentDateTime = new Date();
  return {
    hours: currentDateTime.getHours(),
    minutes: currentDateTime.getMinutes(),
    seconds: currentDateTime.getSeconds(),
  };
}

export function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState<CurrentTime>(() => getSystemTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getSystemTime());
    }, MILLISECONDS_PER_SECOND);
    return () => clearInterval(intervalId);
  }, []);

  return currentTime;
}

export default useCurrentTime;
