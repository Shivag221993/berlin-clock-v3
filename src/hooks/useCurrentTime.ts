import { useEffect, useState } from 'react';

export interface CurrentTime {
  hours: number;
  minutes: number;
  seconds: number;
}

export function useCurrentTime() {
  const [time, setTime] = useState<CurrentTime>(() => {
    const now = new Date();
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    };
  });

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default useCurrentTime;
