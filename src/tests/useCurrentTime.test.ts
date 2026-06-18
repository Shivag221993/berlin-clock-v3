import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useCurrentTime } from '../hooks/useCurrentTime';

const renderCurrentTimeHookAt = (isoString: string) => {
  vi.setSystemTime(new Date(isoString));
  return renderHook(() => useCurrentTime());
};

describe('useCurrentTime hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with current time', () => {
    const { result } = renderCurrentTimeHookAt('2026-06-17T14:30:45');

    expect(result.current.hours).toBe(14);
    expect(result.current.minutes).toBe(30);
    expect(result.current.seconds).toBe(45);
  });

  it('should update time every second', () => {
    const { result } = renderCurrentTimeHookAt('2026-06-17T14:30:45');

    expect(result.current.seconds).toBe(45);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.seconds).toBe(46);
  });

  it('should handle minute transition', () => {
    const { result } = renderCurrentTimeHookAt('2026-06-17T14:30:59');

    expect(result.current.minutes).toBe(30);
    expect(result.current.seconds).toBe(59);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.minutes).toBe(31);
    expect(result.current.seconds).toBe(0);
  });

  it('should handle hour transition', () => {
    const { result } = renderCurrentTimeHookAt('2026-06-17T14:59:59');

    expect(result.current.hours).toBe(14);
    expect(result.current.minutes).toBe(59);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.hours).toBe(15);
    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(0);
  });

  it('should cleanup interval on unmount', () => {
    const { unmount } = renderCurrentTimeHookAt('2026-06-17T14:30:45');

    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval');
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
