import { describe, it, expect } from 'vitest';
import { getFiveMinuteLamps, getSingleMinuteLamps } from '../common/minutesLogic';

describe('Berlin Clock minutes logic', () => {
  it('returns no active lamps for 0 minutes', () => {
    expect(getFiveMinuteLamps(0)).toEqual([false, false, false, false, false, false, false, false, false, false, false]);
    expect(getSingleMinuteLamps(0)).toEqual([false, false, false, false]);
  });

  it('returns the correct lamps for 17 minutes', () => {
    expect(getFiveMinuteLamps(17)).toEqual([true, true, true, false, false, false, false, false, false, false, false]);
    expect(getSingleMinuteLamps(17)).toEqual([true, true, false, false]);
  });

  it('returns all 5-minute lamps for 59 minutes and four single-minute lamps for 59', () => {
    expect(getFiveMinuteLamps(59)).toEqual([true, true, true, true, true, true, true, true, true, true, true]);
    expect(getSingleMinuteLamps(59)).toEqual([true, true, true, true]);
  });

  it('clamps negative minutes to no active lamps', () => {
    expect(getFiveMinuteLamps(-5)).toEqual([false, false, false, false, false, false, false, false, false, false, false]);
    expect(getSingleMinuteLamps(-5)).toEqual([false, false, false, false]);
  });

  it('clamps minutes above 59 to the maximum lamp count', () => {
    expect(getFiveMinuteLamps(75)).toEqual([true, true, true, true, true, true, true, true, true, true, true]);
    expect(getSingleMinuteLamps(75)).toEqual([true, true, true, true]);
  });
});
