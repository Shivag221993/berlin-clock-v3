import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useCurrentTime } from '../hooks/useCurrentTime';

describe('useCurrentTime hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with current time', () => {
    vi.setSystemTime(new Date('2026-06-17T14:30:45'));
    const { result } = renderHook(() => useCurrentTime());

    expect(result.current.hours).toBe(14);
    expect(result.current.minutes).toBe(30);
    expect(result.current.seconds).toBe(45);
  });

  it('should update time every second', () => {
    vi.setSystemTime(new Date('2026-06-17T14:30:45'));
    const { result } = renderHook(() => useCurrentTime());

    expect(result.current.seconds).toBe(45);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.seconds).toBe(46);
  });

  it('should handle minute transition', () => {
    vi.setSystemTime(new Date('2026-06-17T14:30:59'));
    const { result } = renderHook(() => useCurrentTime());

    expect(result.current.minutes).toBe(30);
    expect(result.current.seconds).toBe(59);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.minutes).toBe(31);
    expect(result.current.seconds).toBe(0);
  });

  it('should handle hour transition', () => {
    vi.setSystemTime(new Date('2026-06-17T14:59:59'));
    const { result } = renderHook(() => useCurrentTime());

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
    vi.setSystemTime(new Date('2026-06-17T14:30:45'));
    const { unmount } = renderHook(() => useCurrentTime());

    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
