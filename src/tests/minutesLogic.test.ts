import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getFiveMinuteLamps, getSingleMinuteLamps } from '../common/minutesLogic';

describe('Berlin Clock minutes logic', () => {
  let expectedNoActiveLamps: boolean[];
  let minutes_0_five: boolean[];
  let minutes_0_single: boolean[];
  let minutes_17_five: boolean[];
  let minutes_17_single: boolean[];
  let minutes_59_five: boolean[];
  let minutes_59_single: boolean[];
  let minutes_neg5_five: boolean[];
  let minutes_75_five: boolean[];
  let minutes_75_single: boolean[];

  beforeEach(() => {
    expectedNoActiveLamps = [false, false, false, false, false, false, false, false, false, false, false];
    minutes_0_five = expectedNoActiveLamps;
    minutes_0_single = [false, false, false, false];
    minutes_17_five = [true, true, true, false, false, false, false, false, false, false, false];
    minutes_17_single = [true, true, false, false];
    minutes_59_five = [true, true, true, true, true, true, true, true, true, true, true];
    minutes_59_single = [true, true, true, true];
    minutes_neg5_five = expectedNoActiveLamps;
    minutes_75_five = minutes_59_five;
    minutes_75_single = minutes_59_single;
  });

  afterEach(() => {
    expectedNoActiveLamps = [];
    minutes_0_five = [];
    minutes_0_single = [];
    minutes_17_five = [];
    minutes_17_single = [];
    minutes_59_five = [];
    minutes_59_single = [];
    minutes_neg5_five = [];
    minutes_75_five = [];
    minutes_75_single = [];
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
    expectMinuteLampStates(0, minutes_0_five, minutes_0_single);
  });

  it('returns the correct lamps for 17 minutes', () => {
    expectMinuteLampStates(17, minutes_17_five, minutes_17_single);
  });

  it('returns all 5-minute lamps for 59 minutes and four single-minute lamps for 59', () => {
    expectMinuteLampStates(59, minutes_59_five, minutes_59_single);
  });

  it('clamps negative minutes to no active lamps', () => {
    expectMinuteLampStates(-5, minutes_neg5_five, minutes_0_single);
  });

  it('clamps minutes above 59 to the maximum lamp count', () => {
    expectMinuteLampStates(75, minutes_75_five, minutes_75_single);
  });
});
