import useCurrentTime from '../hooks/useCurrentTime';
import { getFiveHourLamps, getSingleHourLamps } from '../common/hoursLogic';
import { getFiveMinuteLamps, getSingleMinuteLamps } from '../common/minutesLogic';
import { isSecondsLampOn } from '../common/secondsLogic';
import {
  ARIA_FIVE_HOUR_ROW,
  ARIA_FIVE_MINUTE_ROW,
  ARIA_SECONDS_LAMP,
  ARIA_SINGLE_HOUR_ROW,
  ARIA_SINGLE_MINUTE_ROW,
  CLASS_BERLIN_CLOCK,
  CLASS_HOUR_LAMP,
  CLASS_MINUTE_LAMP,
  CLASS_OFF,
  CLASS_ON,
  CLASS_QUARTER,
  CLASS_SECONDS_CIRCLE,
  CURRENT_TIME_LABEL_TEXT,
  QUARTER_MINUTE_DIVISOR,
  QUARTER_MINUTE_REMAINDER,
  TEST_ID_FIVE_HOUR_PREFIX,
  TEST_ID_FIVE_MINUTE_PREFIX,
  TEST_ID_SINGLE_HOUR_PREFIX,
  TEST_ID_SINGLE_MINUTE_PREFIX,
  TIME_PAD_CHARACTER,
  TIME_PAD_LENGTH,
} from '../constants';
import './BerlinClock.css';

const getTimeString = (hours: number, minutes: number, seconds: number) => {
  const paddedHours = String(hours).padStart(TIME_PAD_LENGTH, TIME_PAD_CHARACTER);
  const paddedMinutes = String(minutes).padStart(TIME_PAD_LENGTH, TIME_PAD_CHARACTER);
  const paddedSeconds = String(seconds).padStart(TIME_PAD_LENGTH, TIME_PAD_CHARACTER);
  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};

export function BerlinClock() {
  const { hours, minutes, seconds } = useCurrentTime();
  const isSecondsOn = isSecondsLampOn(seconds);
  const fiveHourLamps = getFiveHourLamps(hours);
  const singleHourLamps = getSingleHourLamps(hours);
  const fiveMinuteLamps = getFiveMinuteLamps(minutes);
  const singleMinuteLamps = getSingleMinuteLamps(minutes);

  return (
    <div className={CLASS_BERLIN_CLOCK}>
      <div className={`${CLASS_SECONDS_CIRCLE} ${isSecondsOn ? CLASS_ON : CLASS_OFF}`} aria-label={ARIA_SECONDS_LAMP} />
      <div className="hours-row" aria-label={ARIA_FIVE_HOUR_ROW}>
        {fiveHourLamps.map((lampOn, lampIndex) => (
          <span
            key={lampIndex}
            className={`${CLASS_HOUR_LAMP} ${lampOn ? CLASS_ON : CLASS_OFF}`}
            data-testid={`${TEST_ID_FIVE_HOUR_PREFIX}${lampIndex}`}
          />
        ))}
      </div>
      <div className="hours-row" aria-label={ARIA_SINGLE_HOUR_ROW}>
        {singleHourLamps.map((lampOn, lampIndex) => (
          <span
            key={lampIndex}
            className={`${CLASS_HOUR_LAMP} ${lampOn ? CLASS_ON : CLASS_OFF}`}
            data-testid={`${TEST_ID_SINGLE_HOUR_PREFIX}${lampIndex}`}
          />
        ))}
      </div>
      <div className="minutes-row" aria-label={ARIA_FIVE_MINUTE_ROW}>
        {fiveMinuteLamps.map((lampOn, lampIndex) => (
          <span
            key={lampIndex}
            className={`${CLASS_MINUTE_LAMP} ${lampOn ? CLASS_ON : CLASS_OFF} ${lampIndex % QUARTER_MINUTE_DIVISOR === QUARTER_MINUTE_REMAINDER ? CLASS_QUARTER : ''}`}
            data-testid={`${TEST_ID_FIVE_MINUTE_PREFIX}${lampIndex}`}
          />
        ))}
      </div>
      <div className="minutes-row" aria-label={ARIA_SINGLE_MINUTE_ROW}>
        {singleMinuteLamps.map((lampOn, lampIndex) => (
          <span
            key={lampIndex}
            className={`${CLASS_MINUTE_LAMP} ${lampOn ? CLASS_ON : CLASS_OFF}`}
            data-testid={`${TEST_ID_SINGLE_MINUTE_PREFIX}${lampIndex}`}
          />
        ))}
      </div>
      <div className="current-time">{CURRENT_TIME_LABEL_TEXT} {getTimeString(hours, minutes, seconds)}</div>
    </div>
  );
}

export default BerlinClock;
