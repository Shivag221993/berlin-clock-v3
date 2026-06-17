import { describe, it, expect } from 'vitest';
import { getFiveHourLamps, getSingleHourLamps } from '../common/hoursLogic';

describe('Berlin Clock hours logic', () => {
  it('returns no active lamps for 0 hours', () => {
    expect(getFiveHourLamps(0)).toEqual([false, false, false, false]);
    expect(getSingleHourLamps(0)).toEqual([false, false, false, false]);
  });

  it('returns one 5-hour lamp for 5 hours', () => {
    expect(getFiveHourLamps(5)).toEqual([true, false, false, false]);
    expect(getSingleHourLamps(5)).toEqual([false, false, false, false]);
  });

  it('returns the correct lamps for 13 hours', () => {
    expect(getFiveHourLamps(13)).toEqual([true, true, false, false]);
    expect(getSingleHourLamps(13)).toEqual([true, true, true, false]);
  });

  it('returns all four 5-hour lamps for 23 hours and three single-hour lamps', () => {
    expect(getFiveHourLamps(23)).toEqual([true, true, true, true]);
    expect(getSingleHourLamps(23)).toEqual([true, true, true, false]);
  });

  it('clamps negative hours to no active lamps', () => {
    expect(getFiveHourLamps(-2)).toEqual([false, false, false, false]);
    expect(getSingleHourLamps(-2)).toEqual([false, false, false, false]);
  });

  it('clamps hours above 23 to the maximum lamp count', () => {
    expect(getFiveHourLamps(30)).toEqual([true, true, true, true]);
    expect(getSingleHourLamps(30)).toEqual([true, true, true, false]);
  });
});
