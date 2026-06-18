import { fireEvent, render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BerlinClock from '../component/BerlinClock';

describe('BerlinClock component (minimal)', () => {
  it('shows an illuminated circle for even seconds', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:58'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const lamp = getByLabelText(/seconds lamp/i);

    expect(lamp.classList.contains('on')).toBe(true);
    expect(getByText(/Current Time:/).textContent).toContain('12:00:58');

    vi.useRealTimers();
  });

  it('shows a dark circle for odd seconds', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:59'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const lamp = getByLabelText(/seconds lamp/i);

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
  });

  it('updates the Berlin Clock from user input and resets to system time', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:58'));

    const { getByLabelText, getByText, getByTestId } = render(<BerlinClock />);
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;
    const resetButton = getByText('Reset to current time');

    fireEvent.change(timeInput, { target: { value: '13:17:22' } });

    expect(timeInput.value).toBe('13:17:22');
    expect(getByText(/Current Time:/).textContent).toContain('13:17:22');
    expect(getByTestId('five-minute-0').classList.contains('on')).toBe(true);
    expect(getByTestId('five-minute-1').classList.contains('on')).toBe(true);
    expect(getByTestId('five-minute-2').classList.contains('on')).toBe(true);
    expect(getByTestId('single-minute-0').classList.contains('on')).toBe(true);
    expect(getByTestId('single-minute-1').classList.contains('on')).toBe(true);
    expect(getByTestId('single-minute-2').classList.contains('off')).toBe(true);

    fireEvent.click(resetButton);

    expect(getByText(/Current Time:/).textContent).toContain('12:00:58');
    expect(timeInput.value).toBe('12:00:58');

    vi.useRealTimers();
  });

  it('accepts valid time input with boundary hours 00 and 23', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:00'));

    const { getByLabelText, getByText, getByTestId } = render(<BerlinClock />);
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;

    fireEvent.change(timeInput, { target: { value: '00:30:45' } });
    expect(getByText(/Current Time:/).textContent).toContain('00:30:45');
    expect(getByTestId('five-hour-0').classList.contains('off')).toBe(true);

    fireEvent.change(timeInput, { target: { value: '23:45:59' } });
    expect(getByText(/Current Time:/).textContent).toContain('23:45:59');
    expect(getByTestId('five-hour-0').classList.contains('on')).toBe(true);
    expect(getByTestId('five-hour-1').classList.contains('on')).toBe(true);
    expect(getByTestId('five-hour-2').classList.contains('on')).toBe(true);
    expect(getByTestId('five-hour-3').classList.contains('on')).toBe(true);

    vi.useRealTimers();
  });

  it('rejects invalid hour values above 23', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:00'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;

    fireEvent.change(timeInput, { target: { value: '24:00:00' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:00:00');

    fireEvent.change(timeInput, { target: { value: '99:30:00' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:00:00');

    vi.useRealTimers();
  });

  it('rejects invalid minute values above 59', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:00'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;

    fireEvent.change(timeInput, { target: { value: '12:60:00' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:00:00');

    fireEvent.change(timeInput, { target: { value: '12:99:00' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:00:00');

    vi.useRealTimers();
  });

  it('rejects invalid second values above 59', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:00'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;

    fireEvent.change(timeInput, { target: { value: '12:30:60' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:00:00');

    fireEvent.change(timeInput, { target: { value: '12:30:99' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:00:00');

    vi.useRealTimers();
  });

  it('rejects malformed time input with wrong format', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:00'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;

    fireEvent.change(timeInput, { target: { value: '12:30' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:00:00');

    fireEvent.change(timeInput, { target: { value: '12:30:00:00' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:00:00');

    fireEvent.change(timeInput, { target: { value: 'abc:de:fg' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:00:00');

    vi.useRealTimers();
  });

  it('accepts single-digit hour/minute/second values', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:00'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;

    fireEvent.change(timeInput, { target: { value: '5:3:7' } });
    expect(getByText(/Current Time:/).textContent).toContain('05:03:07');

    fireEvent.change(timeInput, { target: { value: '0:0:0' } });
    expect(getByText(/Current Time:/).textContent).toContain('00:00:00');

    vi.useRealTimers();
  });

  it('displays manually entered time in the input field until reset', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:00'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;
    const resetButton = getByText('Reset to current time');

    fireEvent.change(timeInput, { target: { value: '14:25:30' } });
    expect(timeInput.value).toBe('14:25:30');

    fireEvent.click(resetButton);
    expect(timeInput.value).toBe('12:00:00');

    vi.useRealTimers();
  });

  it('trims whitespace from time input before parsing', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:00'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;

    fireEvent.change(timeInput, { target: { value: '  13:30:45  ' } });
    expect(getByText(/Current Time:/).textContent).toContain('13:30:45');

    fireEvent.change(timeInput, { target: { value: '\t14:15:30\t' } });
    expect(getByText(/Current Time:/).textContent).toContain('14:15:30');

    vi.useRealTimers();
  });

  it('rejects time strings with leading or trailing characters due to regex anchors', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:00'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;

    fireEvent.change(timeInput, { target: { value: '12:30:45extra' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:00:00');

    fireEvent.change(timeInput, { target: { value: 'prefix12:30:45' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:00:00');

    vi.useRealTimers();
  });

  it('accepts time strings with only leading/trailing whitespace after trimming', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:00'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;

    fireEvent.change(timeInput, { target: { value: '  12:30:45  ' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:30:45');

    fireEvent.change(timeInput, { target: { value: '\t14:15:30\n' } });
    expect(getByText(/Current Time:/).textContent).toContain('14:15:30');

    vi.useRealTimers();
  });

  it('rejects negative hour values', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:00'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;

    fireEvent.change(timeInput, { target: { value: '-1:30:45' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:00:00');

    vi.useRealTimers();
  });

  it('rejects negative minute values', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:00'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;

    fireEvent.change(timeInput, { target: { value: '12:-1:45' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:00:00');

    vi.useRealTimers();
  });

  it('rejects negative second values', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:00'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;

    fireEvent.change(timeInput, { target: { value: '12:30:-1' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:00:00');

    vi.useRealTimers();
  });

  it('accepts exactly 59 for minutes but rejects 60', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:00'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;

    fireEvent.change(timeInput, { target: { value: '12:59:30' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:59:30');

    fireEvent.change(timeInput, { target: { value: '12:60:30' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:59:30');

    vi.useRealTimers();
  });

  it('only updates display when parsed time is valid', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:00'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;

    fireEvent.change(timeInput, { target: { value: '99:99:99' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:00:00');

    fireEvent.change(timeInput, { target: { value: '18:45:22' } });
    expect(getByText(/Current Time:/).textContent).toContain('18:45:22');

    fireEvent.change(timeInput, { target: { value: 'invalid' } });
    expect(getByText(/Current Time:/).textContent).toContain('18:45:22');

    vi.useRealTimers();
  });

  it('accepts hour boundary 0 and rejects boundary 24', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:00'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;

    fireEvent.change(timeInput, { target: { value: '0:15:30' } });
    expect(getByText(/Current Time:/).textContent).toContain('00:15:30');

    fireEvent.change(timeInput, { target: { value: '00:15:30' } });
    expect(getByText(/Current Time:/).textContent).toContain('00:15:30');

    fireEvent.change(timeInput, { target: { value: '24:15:30' } });
    expect(getByText(/Current Time:/).textContent).toContain('00:15:30');

    vi.useRealTimers();
  });

  it('accepts minute boundary 0 and rejects boundary 60', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:00'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;

    fireEvent.change(timeInput, { target: { value: '12:0:30' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:00:30');

    fireEvent.change(timeInput, { target: { value: '12:00:30' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:00:30');

    fireEvent.change(timeInput, { target: { value: '12:60:30' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:00:30');

    vi.useRealTimers();
  });

  it('accepts second boundary 0 and rejects boundary 60', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:00'));

    const { getByLabelText, getByText } = render(<BerlinClock />);
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;

    fireEvent.change(timeInput, { target: { value: '12:30:0' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:30:00');

    fireEvent.change(timeInput, { target: { value: '12:30:00' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:30:00');

    fireEvent.change(timeInput, { target: { value: '12:30:60' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:30:00');

    vi.useRealTimers();
  });
});
