import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LampRow } from '../component/LampRow';
import { CLASS_ON, CLASS_OFF, CLASS_QUARTER } from '../constants';

describe('LampRow component', () => {
  it('renders a row with the provided class and aria-label', () => {
    const fiveMinuteStates = [true, false];
    const { container } = render(
      <LampRow
        rowClassName="test-row"
        rowAriaLabel="Test row"
        lampStates={fiveMinuteStates}
        lampClassName="lamp"
        testIdPrefix="test-lamp-"
        ariaLabelPrefix="Lamp"
      />,
    );

    const row = container.querySelector('.test-row');
    expect(row).not.toBeNull();
    expect(row).toHaveAttribute('aria-label', 'Test row');
  });

  it('renders lamps with on/off classes based on state', () => {
    const fiveMinuteStates = [true, false, true];
    const { getByTestId } = render(
      <LampRow
        rowClassName="test-row"
        rowAriaLabel="Test row"
        lampStates={fiveMinuteStates}
        lampClassName="lamp"
        testIdPrefix="test-lamp-"
        ariaLabelPrefix="Lamp"
      />,
    );

    expect(getByTestId('test-lamp-0').classList.contains('lamp')).toBe(true);
    expect(getByTestId('test-lamp-0').classList.contains(CLASS_ON)).toBe(true);
    expect(getByTestId('test-lamp-1').classList.contains(CLASS_OFF)).toBe(true);
    expect(getByTestId('test-lamp-2').classList.contains(CLASS_ON)).toBe(true);
  });

  it('applies additional lamp class for each lamp index', () => {
    const fiveMinuteStates = [true, true, true];
    const { getByTestId } = render(
      <LampRow
        rowClassName="test-row"
        rowAriaLabel="Test row"
        lampStates={fiveMinuteStates}
        lampClassName="lamp"
        testIdPrefix="test-lamp-"
        ariaLabelPrefix="Lamp"
        additionalLampClass={(lampIndex) => (lampIndex === 1 ? CLASS_QUARTER : '')}
      />,
    );

    expect(getByTestId('test-lamp-0').classList.contains(CLASS_QUARTER)).toBe(false);
    expect(getByTestId('test-lamp-1').classList.contains(CLASS_QUARTER)).toBe(true);
    expect(getByTestId('test-lamp-2').classList.contains(CLASS_QUARTER)).toBe(false);
  });

  it('adds aria-labels for each lamp based on the ariaLabelPrefix and index', () => {
    const fiveMinuteStates = [true, false];
    const { getByLabelText } = render(
      <LampRow
        rowClassName="test-row"
        rowAriaLabel="Test row"
        lampStates={fiveMinuteStates}
        lampClassName="lamp"
        testIdPrefix="test-lamp-"
        ariaLabelPrefix="Lamp"
      />,
    );

    expect(getByLabelText('Lamp 0 on')).not.toBeNull();
    expect(getByLabelText('Lamp 1 off')).not.toBeNull();
  });
});
