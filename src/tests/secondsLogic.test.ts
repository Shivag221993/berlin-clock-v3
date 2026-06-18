import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { isSecondsLampOn } from '../common/secondsLogic';

describe('Seconds lamp (top round) behavior', () => {
  let outOfRangeSeconds: number[];

  beforeEach(() => {
    outOfRangeSeconds = [60, 120];
  });

  afterEach(() => {
    outOfRangeSeconds = [];
  });

  const expectSecondsLampState = (seconds: number, expected: boolean) => {
    expect(isSecondsLampOn(seconds)).toBe(expected);
  };

  it('is illuminated for 0 (even)', () => {
    expectSecondsLampState(0, true);
  });

  it('is dark for 1 (odd)', () => {
    expectSecondsLampState(1, false);
  });

  it('is illuminated for 58 (even)', () => {
    expectSecondsLampState(58, true);
  });

  it('is dark for 59 (odd)', () => {
    expectSecondsLampState(59, false);
  });

  it('floors fractional seconds (2.9 -> 2 is even)', () => {
    expectSecondsLampState(2.9, true);
  });

  it('returns false for negative seconds', () => {
    expectSecondsLampState(-2, false);
  });

  it('returns false for seconds equal to 60 (out of range)', () => {
    expect(isSecondsLampOn(outOfRangeSeconds[0])).toBe(false);
  });

  it('returns false for large seconds like 120 (out of range)', () => {
    expect(isSecondsLampOn(outOfRangeSeconds[1])).toBe(false);
  });
});
