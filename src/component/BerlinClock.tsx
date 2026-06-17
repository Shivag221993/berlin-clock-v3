import useSeconds from '../hooks/useSecondsHook';
import './BerlinClock.css';

export function BerlinClock() {
  const { second, isOn } = useSeconds();

  return (
    <div className="berlin-clock">
      <div className={`seconds-circle ${isOn ? 'on' : 'off'}`} aria-label="seconds-lamp" />
      <div className="seconds-label">Seconds: {second}</div>
    </div>
  );
}

export default BerlinClock;
