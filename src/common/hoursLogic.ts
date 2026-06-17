import { HOUR_LAMP_COUNT, HOURS_PER_FIVE_HOUR_LAMP, MAX_HOURS } from '../constants';

export function getFiveHourLamps(hours: number): boolean[] {
  const sanitizedHours = Math.max(0, Math.min(MAX_HOURS, Math.floor(hours)));
  const activeFiveHourLamps = Math.floor(sanitizedHours / HOURS_PER_FIVE_HOUR_LAMP);
  return Array.from({ length: HOUR_LAMP_COUNT }, (_, lampIndex) => lampIndex < activeFiveHourLamps);
}

export function getSingleHourLamps(hours: number): boolean[] {
  const sanitizedHours = Math.max(0, Math.min(MAX_HOURS, Math.floor(hours)));
  const activeSingleHourLamps = sanitizedHours % HOURS_PER_FIVE_HOUR_LAMP;
  return Array.from({ length: HOUR_LAMP_COUNT }, (_, lampIndex) => lampIndex < activeSingleHourLamps);
}
