import { MAX_MINUTES_SECONDS } from '../constants';

export function isSecondsLampOn(second: number): boolean {
  const sanitizedSecond = Math.floor(second);
  if (sanitizedSecond < 0 || sanitizedSecond >= MAX_MINUTES_SECONDS + 1) return false;
  return sanitizedSecond % 2 === 0;
}

export default isSecondsLampOn;
