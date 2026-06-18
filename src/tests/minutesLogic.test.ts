import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getFiveMinuteLamps, getSingleMinuteLamps } from '../common/minutesLogic';

describe('Berlin Clock minutes logic', () => {
  let expectedNoActiveLamps: boolean[];

  beforeEach(() => {
    expectedNoActiveLamps = [false, false, false, false, false, false, false, false, false, false, false];
  });

  afterEach(() => {
    expectedNoActiveLamps = [];
  });

  const expectMinuteLampStates = (
    minutes: number,
    fiveMinuteLamps: boolean[],
    singleMinuteLamps: boolean[],
  ) => {
    expect(getFiveMinuteLamps(minutes)).toEqual(fiveMinuteLamps);
    expect(getSingleMinuteLamps(minutes)).toEqual(singleMinuteLamps);
  };

  it('returns no active lamps for 0 minutes', () => {
    expectMinuteLampStates(0, expectedNoActiveLamps, [false, false, false, false]);
  });

  it('returns the correct lamps for 17 minutes', () => {
    expectMinuteLampStates(17, [true, true, true, false, false, false, false, false, false, false, false], [true, true, false, false]);
  });

  it('returns all 5-minute lamps for 59 minutes and four single-minute lamps for 59', () => {
    expectMinuteLampStates(59, [true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true]);
  });

  it('clamps negative minutes to no active lamps', () => {
    expectMinuteLampStates(-5, expectedNoActiveLamps, [false, false, false, false]);
  });

  it('clamps minutes above 59 to the maximum lamp count', () => {
    expectMinuteLampStates(75, [true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true]);
  });
});
