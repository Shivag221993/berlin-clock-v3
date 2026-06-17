import {
  FIVE_MINUTE_LAMP_COUNT,
  MAX_MINUTES_SECONDS,
  MINUTES_PER_FIVE_MINUTE_LAMP,
  SINGLE_MINUTE_LAMP_COUNT,
} from '../constants';

export function getFiveMinuteLamps(minutes: number): boolean[] {
  const sanitizedMinutes = Math.max(0, Math.min(MAX_MINUTES_SECONDS, Math.floor(minutes)));
  const activeFiveMinuteLamps = Math.floor(sanitizedMinutes / MINUTES_PER_FIVE_MINUTE_LAMP);
  return Array.from({ length: FIVE_MINUTE_LAMP_COUNT }, (_, lampIndex) => lampIndex < activeFiveMinuteLamps);
}

export function getSingleMinuteLamps(minutes: number): boolean[] {
  const sanitizedMinutes = Math.max(0, Math.min(MAX_MINUTES_SECONDS, Math.floor(minutes)));
  const activeSingleMinuteLamps = sanitizedMinutes % MINUTES_PER_FIVE_MINUTE_LAMP;
  return Array.from({ length: SINGLE_MINUTE_LAMP_COUNT }, (_, lampIndex) => lampIndex < activeSingleMinuteLamps);
}
