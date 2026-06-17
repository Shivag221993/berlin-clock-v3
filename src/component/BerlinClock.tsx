import useSeconds from '../hooks/useSecondsHook';
import useCurrentTime from '../hooks/useCurrentTime';
import './BerlinClock.css';

export function BerlinClock() {
  const { isOn } = useSeconds();
  const { hours, minutes, seconds } = useCurrentTime();

  const formatTime = (h: number, m: number, s: number) => {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="berlin-clock">
      <div className={`seconds-circle ${isOn ? 'on' : 'off'}`} aria-label="seconds-lamp" />
      <div className="current-time">Current Time: {formatTime(hours, minutes, seconds)}</div>
    </div>
  );
}

export default BerlinClock;
