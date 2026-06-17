export function isSecondsLampOn(second: number): boolean {
  const s = Math.floor(second);
  if (s < 0 || s >= 60) return false;
  return s % 2 === 0;
}

export default isSecondsLampOn;
