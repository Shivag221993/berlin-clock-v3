import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BerlinClock from '../component/BerlinClock';

describe('BerlinClock component (minimal)', () => {
  it('shows an illuminated circle for even seconds', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:58'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const lamp = getByLabelText('seconds-lamp');

    expect(lamp.classList.contains('on')).toBe(true);
    expect(getByText(/Current Time:/).textContent).toContain('12:00:58');

    vi.useRealTimers();
  });

  it('shows a dark circle for odd seconds', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:59'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const lamp = getByLabelText('seconds-lamp');

    expect(lamp.classList.contains('off')).toBe(true);
    expect(getByText(/Current Time:/).textContent).toContain('12:00:59');

    vi.useRealTimers();
  });

  it('displays current time in HH:MM:SS format', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T09:05:03'));

    const { getByText } = render(<BerlinClock />);

    expect(getByText(/Current Time:/).textContent).toContain('09:05:03');

    vi.useRealTimers();
  });

  it('displays formatted time with leading zeros', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T01:02:05'));

    const { getByText } = render(<BerlinClock />);

    expect(getByText(/Current Time:/).textContent).toContain('01:02:05');

    vi.useRealTimers();
  });
});
