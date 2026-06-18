import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getFiveHourLamps, getSingleHourLamps } from '../common/hoursLogic';

describe('Berlin Clock hours logic', () => {
  let expectedNoActiveLamps: boolean[];

  beforeEach(() => {
    expectedNoActiveLamps = [false, false, false, false];
  });

  afterEach(() => {
    expectedNoActiveLamps = [];
  });

  const expectHourLampStates = (
    hour: number,
    fiveHourLamps: boolean[],
    singleHourLamps: boolean[],
  ) => {
    expect(getFiveHourLamps(hour)).toEqual(fiveHourLamps);
    expect(getSingleHourLamps(hour)).toEqual(singleHourLamps);
  };

  it('returns no active lamps for 0 hours', () => {
    expectHourLampStates(0, expectedNoActiveLamps, expectedNoActiveLamps);
  });

  it('returns one 5-hour lamp for 5 hours', () => {
    expectHourLampStates(5, [true, false, false, false], [false, false, false, false]);
  });

  it('returns the correct lamps for 13 hours', () => {
    expectHourLampStates(13, [true, true, false, false], [true, true, true, false]);
  });

  it('returns all four 5-hour lamps for 23 hours and three single-hour lamps', () => {
    expectHourLampStates(23, [true, true, true, true], [true, true, true, false]);
  });

  it('clamps negative hours to no active lamps', () => {
    expectHourLampStates(-2, expectedNoActiveLamps, expectedNoActiveLamps);
  });

  it('clamps hours above 23 to the maximum lamp count', () => {
    expectHourLampStates(30, [true, true, true, true], [true, true, true, false]);
  });
});
