export function getFiveMinuteLamps(minutes: number): boolean[] {
  const m = Math.max(0, Math.min(59, Math.floor(minutes)));
  const active = Math.floor(m / 5);
  return Array.from({ length: 11 }, (_, index) => index < active);
}

export function getSingleMinuteLamps(minutes: number): boolean[] {
  const m = Math.max(0, Math.min(59, Math.floor(minutes)));
  const active = m % 5;
  return Array.from({ length: 4 }, (_, index) => index < active);
}
