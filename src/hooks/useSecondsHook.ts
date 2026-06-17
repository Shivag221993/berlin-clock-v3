import { useEffect, useState } from 'react';
import isSecondsLampOn from '../common/secondsLogic';

export function useSeconds() {
  const [second, setSecond] = useState<number>(() => new Date().getSeconds());
  // Stryker disable all
  useEffect(() => {
    const id = setInterval(() => setSecond(new Date().getSeconds()), 1000);
    return () => clearInterval(id);
  }, []);
  // Stryker restore all
  const isOn = isSecondsLampOn(second);
  return { second, isOn } as const;
}

export default useSeconds;
