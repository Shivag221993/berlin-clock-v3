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

  it('renders 5-hour and single-hour lamps for a given time', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T13:00:00'));

    const { getByTestId } = render(<BerlinClock />);

    expect(getByTestId('five-hour-0').classList.contains('on')).toBe(true);
    expect(getByTestId('five-hour-1').classList.contains('on')).toBe(true);
    expect(getByTestId('five-hour-2').classList.contains('off')).toBe(true);
    expect(getByTestId('five-hour-3').classList.contains('off')).toBe(true);

    expect(getByTestId('single-hour-0').classList.contains('on')).toBe(true);
    expect(getByTestId('single-hour-1').classList.contains('on')).toBe(true);
    expect(getByTestId('single-hour-2').classList.contains('on')).toBe(true);
    expect(getByTestId('single-hour-3').classList.contains('off')).toBe(true);

    vi.useRealTimers();
  });

  it('renders 5-minute and single-minute lamps for a given time', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T13:17:00'));

    const { getByTestId } = render(<BerlinClock />);

    expect(getByTestId('five-minute-0').classList.contains('on')).toBe(true);
    expect(getByTestId('five-minute-1').classList.contains('on')).toBe(true);
    expect(getByTestId('five-minute-2').classList.contains('on')).toBe(true);
    expect(getByTestId('five-minute-3').classList.contains('off')).toBe(true);
    expect(getByTestId('five-minute-4').classList.contains('off')).toBe(true);

    expect(getByTestId('single-minute-0').classList.contains('on')).toBe(true);
    expect(getByTestId('single-minute-1').classList.contains('on')).toBe(true);
    expect(getByTestId('single-minute-2').classList.contains('off')).toBe(true);
    expect(getByTestId('single-minute-3').classList.contains('off')).toBe(true);

    vi.useRealTimers();
  });
  it('renders quarter-minute markers only at the 3rd, 6th, and 9th five-minute lamps', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T13:17:00'));

    const { getByTestId } = render(<BerlinClock />);

    expect(getByTestId('five-minute-2').classList.contains('quarter')).toBe(true);
    expect(getByTestId('five-minute-5').classList.contains('quarter')).toBe(true);
    expect(getByTestId('five-minute-8').classList.contains('quarter')).toBe(true);
    expect(getByTestId('five-minute-3').classList.contains('quarter')).toBe(false);
    expect(getByTestId('five-minute-4').classList.contains('quarter')).toBe(false);
    expect(getByTestId('five-minute-3').classList.contains('Stryker')).toBe(false);
    expect(getByTestId('five-minute-3').classList.contains('was')).toBe(false);
    expect(getByTestId('five-minute-3').classList.contains('here!')).toBe(false);

    vi.useRealTimers();
  });});
