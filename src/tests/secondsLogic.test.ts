import { describe, it, expect } from 'vitest';
import { isSecondsLampOn } from '../common/secondsLogic';

describe('Seconds lamp (top round) behavior', () => {
  it('is illuminated for 0 (even)', () => {
    expect(isSecondsLampOn(0)).toBe(true);
  });

  it('is dark for 1 (odd)', () => {
    expect(isSecondsLampOn(1)).toBe(false);
  });

  it('is illuminated for 58 (even)', () => {
    expect(isSecondsLampOn(58)).toBe(true);
  });

  it('is dark for 59 (odd)', () => {
    expect(isSecondsLampOn(59)).toBe(false);
  });

  it('floors fractional seconds (2.9 -> 2 is even)', () => {
    expect(isSecondsLampOn(2.9)).toBe(true);
  });

  it('returns false for negative seconds', () => {
    expect(isSecondsLampOn(-2)).toBe(false);
  });

  it('returns false for seconds equal to 60 (out of range)', () => {
    expect(isSecondsLampOn(60)).toBe(false);
  });

  it('returns false for large seconds like 120 (out of range)', () => {
    expect(isSecondsLampOn(120)).toBe(false);
  });
});
