import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useSeconds from '../hooks/useSecondsHook';

function TestComponent() {
  const { second, isOn } = useSeconds();
  return (
    <div>
      <span data-testid="second">{second}</span>
      <span data-testid="ison">{isOn ? '1' : '0'}</span>
    </div>
  );
}

describe('useSeconds hook (minimal)', () => {
  it('returns current second and isOn for an even second', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T12:00:58'));

    const { getByTestId } = render(<TestComponent />);

    expect(getByTestId('second').textContent).toBe('58');
    expect(getByTestId('ison').textContent).toBe('1');

    vi.useRealTimers();
  });
});
