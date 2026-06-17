export function getFiveHourLamps(hours: number): boolean[] {
  const h = Math.max(0, Math.min(23, Math.floor(hours)));
  const active = Math.floor(h / 5);
  return Array.from({ length: 4 }, (_, index) => index < active);
}

export function getSingleHourLamps(hours: number): boolean[] {
  const h = Math.max(0, Math.min(23, Math.floor(hours)));
  const active = h % 5;
  return Array.from({ length: 4 }, (_, index) => index < active);
}
