import useCurrentTime from '../hooks/useCurrentTime';
import { getFiveHourLamps, getSingleHourLamps } from '../common/hoursLogic';
import { getFiveMinuteLamps, getSingleMinuteLamps } from '../common/minutesLogic';
import { isSecondsLampOn } from '../common/secondsLogic';
import './BerlinClock.css';

export function BerlinClock() {
  const { hours, minutes, seconds } = useCurrentTime();
  const isOn = isSecondsLampOn(seconds);
  const fiveHourLamps = getFiveHourLamps(hours);
  const singleHourLamps = getSingleHourLamps(hours);
  const fiveMinuteLamps = getFiveMinuteLamps(minutes);
  const singleMinuteLamps = getSingleMinuteLamps(minutes);

  const formatTime = (h: number, m: number, s: number) => {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="berlin-clock">
      <div className={`seconds-circle ${isOn ? 'on' : 'off'}`} aria-label="seconds-lamp" />
      <div className="hours-row five-hour-row" aria-label="five-hour-row">
        {fiveHourLamps.map((on, index) => (
          <span
            key={index}
            className={`hour-lamp ${on ? 'on' : 'off'}`}
            data-testid={`five-hour-${index}`}
          />
        ))}
      </div>
      <div className="hours-row single-hour-row" aria-label="single-hour-row">
        {singleHourLamps.map((on, index) => (
          <span
            key={index}
            className={`hour-lamp ${on ? 'on' : 'off'}`}
            data-testid={`single-hour-${index}`}
          />
        ))}
      </div>
      <div className="minutes-row five-minute-row" aria-label="five-minute-row">
        {fiveMinuteLamps.map((on, index) => (
          <span
            key={index}
            className={`minute-lamp ${on ? 'on' : 'off'} ${index % 3 === 2 ? 'quarter' : ''}`}
            data-testid={`five-minute-${index}`}
          />
        ))}
      </div>
      <div className="minutes-row single-minute-row" aria-label="single-minute-row">
        {singleMinuteLamps.map((on, index) => (
          <span
            key={index}
            className={`minute-lamp ${on ? 'on' : 'off'}`}
            data-testid={`single-minute-${index}`}
          />
        ))}
      </div>
      <div className="current-time">Current Time: {formatTime(hours, minutes, seconds)}</div>
    </div>
  );
}

export default BerlinClock;
