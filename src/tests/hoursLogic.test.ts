import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getFiveHourLamps, getSingleHourLamps } from '../common/hoursLogic';

describe('Berlin Clock hours logic', () => {
  let expectedNoActiveLamps: boolean[];
  let hours_0_five: boolean[];
  let hours_0_single: boolean[];
  let hours_5_five: boolean[];
  let hours_5_single: boolean[];
  let hours_13_five: boolean[];
  let hours_13_single: boolean[];
  let hours_23_five: boolean[];
  let hours_23_single: boolean[];
  let hours_neg2_five: boolean[];
  let hours_30_five: boolean[];
  let hours_30_single: boolean[];

  beforeEach(() => {
    expectedNoActiveLamps = [false, false, false, false];
    hours_0_five = expectedNoActiveLamps;
    hours_0_single = expectedNoActiveLamps;
    hours_5_five = [true, false, false, false];
    hours_5_single = [false, false, false, false];
    hours_13_five = [true, true, false, false];
    hours_13_single = [true, true, true, false];
    hours_23_five = [true, true, true, true];
    hours_23_single = [true, true, true, false];
    hours_neg2_five = expectedNoActiveLamps;
    hours_30_five = [true, true, true, true];
    hours_30_single = [true, true, true, false];
  });

  afterEach(() => {
    expectedNoActiveLamps = [];
    hours_0_five = [];
    hours_0_single = [];
    hours_5_five = [];
    hours_5_single = [];
    hours_13_five = [];
    hours_13_single = [];
    hours_23_five = [];
    hours_23_single = [];
    hours_neg2_five = [];
    hours_30_five = [];
    hours_30_single = [];
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
    expectHourLampStates(0, hours_0_five, hours_0_single);
  });

  it('returns one 5-hour lamp for 5 hours', () => {
    expectHourLampStates(5, hours_5_five, hours_5_single);
  });

  it('returns the correct lamps for 13 hours', () => {
    expectHourLampStates(13, hours_13_five, hours_13_single);
  });

  it('returns all four 5-hour lamps for 23 hours and three single-hour lamps', () => {
    expectHourLampStates(23, hours_23_five, hours_23_single);
  });

  it('clamps negative hours to no active lamps', () => {
    expectHourLampStates(-2, hours_neg2_five, expectedNoActiveLamps);
  });

  it('clamps hours above 23 to the maximum lamp count', () => {
    expectHourLampStates(30, hours_30_five, hours_30_single);
  });
});
