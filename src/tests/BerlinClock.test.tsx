import { fireEvent, render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import BerlinClock from '../component/BerlinClock';

const renderBerlinClockAt = (isoString: string) => {
  vi.setSystemTime(new Date(isoString));
  return render(<BerlinClock />);
};

const updateTimeInput = (
  getByLabelText: (label: string) => HTMLElement,
  value: string,
) => {
  const timeInput = getByLabelText('Enter time') as HTMLInputElement;
  fireEvent.change(timeInput, { target: { value } });
  return timeInput;
};

describe('BerlinClock component (minimal)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows an illuminated circle for even seconds', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:58');
    const lamp = getByLabelText(/seconds lamp/i);

    expect(lamp.classList.contains('on')).toBe(true);
    expect(getByText(/Current Time:/).textContent).toContain('12:00:58');
  });

  it('shows a dark circle for odd seconds', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:59');
    const lamp = getByLabelText(/seconds lamp/i);

    expect(lamp.classList.contains('off')).toBe(true);
    expect(getByText(/Current Time:/).textContent).toContain('12:00:59');
  });

  it('displays current time in HH:MM:SS format', () => {
    const { getByText } = renderBerlinClockAt('2026-06-17T09:05:03');

    expect(getByText(/Current Time:/).textContent).toContain('09:05:03');
  });

  it('displays formatted time with leading zeros', () => {
    const { getByText } = renderBerlinClockAt('2026-06-17T01:02:05');

    expect(getByText(/Current Time:/).textContent).toContain('01:02:05');
  });

  it('renders 5-hour and single-hour lamps for a given time', () => {
    const { getByTestId } = renderBerlinClockAt('2026-06-17T13:00:00');

    expect(getByTestId('five-hour-0').classList.contains('on')).toBe(true);
    expect(getByTestId('five-hour-1').classList.contains('on')).toBe(true);
    expect(getByTestId('five-hour-2').classList.contains('off')).toBe(true);
    expect(getByTestId('five-hour-3').classList.contains('off')).toBe(true);

    expect(getByTestId('single-hour-0').classList.contains('on')).toBe(true);
    expect(getByTestId('single-hour-1').classList.contains('on')).toBe(true);
    expect(getByTestId('single-hour-2').classList.contains('on')).toBe(true);
    expect(getByTestId('single-hour-3').classList.contains('off')).toBe(true);
  });

  it('renders 5-minute and single-minute lamps for a given time', () => {
    const { getByTestId } = renderBerlinClockAt('2026-06-17T13:17:00');

    expect(getByTestId('five-minute-0').classList.contains('on')).toBe(true);
    expect(getByTestId('five-minute-1').classList.contains('on')).toBe(true);
    expect(getByTestId('five-minute-2').classList.contains('on')).toBe(true);
    expect(getByTestId('five-minute-3').classList.contains('off')).toBe(true);
    expect(getByTestId('five-minute-4').classList.contains('off')).toBe(true);

    expect(getByTestId('single-minute-0').classList.contains('on')).toBe(true);
    expect(getByTestId('single-minute-1').classList.contains('on')).toBe(true);
    expect(getByTestId('single-minute-2').classList.contains('off')).toBe(true);
    expect(getByTestId('single-minute-3').classList.contains('off')).toBe(true);
  });

  it('renders quarter-minute markers only at the 3rd, 6th, and 9th five-minute lamps', () => {
    const { getByTestId } = renderBerlinClockAt('2026-06-17T13:17:00');

    expect(getByTestId('five-minute-2').classList.contains('quarter')).toBe(true);
    expect(getByTestId('five-minute-5').classList.contains('quarter')).toBe(true);
    expect(getByTestId('five-minute-8').classList.contains('quarter')).toBe(true);
    expect(getByTestId('five-minute-3').classList.contains('quarter')).toBe(false);
    expect(getByTestId('five-minute-4').classList.contains('quarter')).toBe(false);
    expect(getByTestId('five-minute-3').classList.contains('Stryker')).toBe(false);
    expect(getByTestId('five-minute-3').classList.contains('was')).toBe(false);
    expect(getByTestId('five-minute-3').classList.contains('here!')).toBe(false);
  });

  it('updates the Berlin Clock from user input and resets to system time', () => {
    const { getByLabelText, getByText, getByTestId } = renderBerlinClockAt('2026-06-17T12:00:58');
    const timeInput = updateTimeInput(getByLabelText, '13:17:22');
    const resetButton = getByText('Reset to current time');

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
  });

  it('accepts valid time input with boundary hours 00 and 23', () => {
    const { getByLabelText, getByText, getByTestId } = renderBerlinClockAt('2026-06-17T12:00:00');
    const timeInput = updateTimeInput(getByLabelText, '00:30:45');

    expect(getByText(/Current Time:/).textContent).toContain('00:30:45');
    expect(getByTestId('five-hour-0').classList.contains('off')).toBe(true);

    updateTimeInput(getByLabelText, '23:45:59');
    expect(getByText(/Current Time:/).textContent).toContain('23:45:59');
    expect(getByTestId('five-hour-0').classList.contains('on')).toBe(true);
    expect(getByTestId('five-hour-1').classList.contains('on')).toBe(true);
    expect(getByTestId('five-hour-2').classList.contains('on')).toBe(true);
    expect(getByTestId('five-hour-3').classList.contains('on')).toBe(true);
  });

  const expectInvalidTimeInputMaintainsCurrent = (
    getByLabelText: (label: string) => HTMLElement,
    getByText: (text: RegExp) => HTMLElement,
    invalidValues: string[],
    expectedCurrent: string,
  ) => {
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;

    invalidValues.forEach((value) => {
      fireEvent.change(timeInput, { target: { value } });
      expect(getByText(/Current Time:/).textContent).toContain(expectedCurrent);
    });
  };

  it('rejects invalid hour values above 23', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:00');
    expectInvalidTimeInputMaintainsCurrent(getByLabelText, getByText, ['24:00:00', '99:30:00'], '12:00:00');
  });

  it('rejects invalid minute values above 59', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:00');
    expectInvalidTimeInputMaintainsCurrent(getByLabelText, getByText, ['12:60:00', '12:99:00'], '12:00:00');
  });

  it('rejects invalid second values above 59', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:00');
    expectInvalidTimeInputMaintainsCurrent(getByLabelText, getByText, ['12:30:60', '12:30:99'], '12:00:00');
  });

  it('rejects malformed time input with wrong format', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:00');
    expectInvalidTimeInputMaintainsCurrent(getByLabelText, getByText, ['12:30', '12:30:00:00', 'abc:de:fg'], '12:00:00');
  });

  it('accepts single-digit hour/minute/second values', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:00');
    updateTimeInput(getByLabelText, '5:3:7');
    expect(getByText(/Current Time:/).textContent).toContain('05:03:07');

    updateTimeInput(getByLabelText, '0:0:0');
    expect(getByText(/Current Time:/).textContent).toContain('00:00:00');
  });

  it('displays manually entered time in the input field until reset', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:00');
    const timeInput = updateTimeInput(getByLabelText, '14:25:30');
    const resetButton = getByText('Reset to current time');

    expect(timeInput.value).toBe('14:25:30');

    fireEvent.click(resetButton);
    expect(timeInput.value).toBe('12:00:00');
  });

  it('trims whitespace from time input before parsing', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:00');
    updateTimeInput(getByLabelText, '  13:30:45  ');
    expect(getByText(/Current Time:/).textContent).toContain('13:30:45');

    updateTimeInput(getByLabelText, '\t14:15:30\t');
    expect(getByText(/Current Time:/).textContent).toContain('14:15:30');
  });

  it('rejects time strings with leading or trailing characters due to regex anchors', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:00');
    expectInvalidTimeInputMaintainsCurrent(getByLabelText, getByText, ['12:30:45extra', 'prefix12:30:45'], '12:00:00');
  });

  it('accepts time strings with only leading/trailing whitespace after trimming', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:00');
    updateTimeInput(getByLabelText, '  12:30:45  ');
    expect(getByText(/Current Time:/).textContent).toContain('12:30:45');

    updateTimeInput(getByLabelText, '\t14:15:30\n');
    expect(getByText(/Current Time:/).textContent).toContain('14:15:30');
  });

  it('rejects negative hour values', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:00');
    expectInvalidTimeInputMaintainsCurrent(getByLabelText, getByText, ['-1:30:45'], '12:00:00');
  });

  it('rejects negative minute values', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:00');
    expectInvalidTimeInputMaintainsCurrent(getByLabelText, getByText, ['12:-1:45'], '12:00:00');
  });

  it('rejects negative second values', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:00');
    expectInvalidTimeInputMaintainsCurrent(getByLabelText, getByText, ['12:30:-1'], '12:00:00');
  });

  it('accepts exactly 59 for minutes but rejects 60', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:00');
    updateTimeInput(getByLabelText, '12:59:30');
    expect(getByText(/Current Time:/).textContent).toContain('12:59:30');

    expectInvalidTimeInputMaintainsCurrent(getByLabelText, getByText, ['12:60:30'], '12:59:30');
  });

  it('only updates display when parsed time is valid', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:00');
    const timeInput = getByLabelText('Enter time') as HTMLInputElement;

    fireEvent.change(timeInput, { target: { value: '99:99:99' } });
    expect(getByText(/Current Time:/).textContent).toContain('12:00:00');

    fireEvent.change(timeInput, { target: { value: '18:45:22' } });
    expect(getByText(/Current Time:/).textContent).toContain('18:45:22');

    fireEvent.change(timeInput, { target: { value: 'invalid' } });
    expect(getByText(/Current Time:/).textContent).toContain('18:45:22');
  });

  it('accepts hour boundary 0 and rejects boundary 24', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:00');
    const timeInput = updateTimeInput(getByLabelText, '0:15:30');
    expect(getByText(/Current Time:/).textContent).toContain('00:15:30');

    updateTimeInput(getByLabelText, '00:15:30');
    expect(getByText(/Current Time:/).textContent).toContain('00:15:30');

    expectInvalidTimeInputMaintainsCurrent(getByLabelText, getByText, ['24:15:30'], '00:15:30');
  });

  it('accepts minute boundary 0 and rejects boundary 60', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:00');
    const timeInput = updateTimeInput(getByLabelText, '12:0:30');
    expect(getByText(/Current Time:/).textContent).toContain('12:00:30');

    updateTimeInput(getByLabelText, '12:00:30');
    expect(getByText(/Current Time:/).textContent).toContain('12:00:30');

    expectInvalidTimeInputMaintainsCurrent(getByLabelText, getByText, ['12:60:30'], '12:00:30');
  });

  it('accepts second boundary 0 and rejects boundary 60', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:00');
    const timeInput = updateTimeInput(getByLabelText, '12:30:0');
    expect(getByText(/Current Time:/).textContent).toContain('12:30:00');

    updateTimeInput(getByLabelText, '12:30:00');
    expect(getByText(/Current Time:/).textContent).toContain('12:30:00');

    expectInvalidTimeInputMaintainsCurrent(getByLabelText, getByText, ['12:30:60'], '12:30:00');
  });
});
