import useCurrentTime, { CurrentTime } from '../hooks/useCurrentTime';
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
  INPUT_BUTTON_GROUP_LABEL,
  QUARTER_MINUTE_DIVISOR,
  QUARTER_MINUTE_REMAINDER,
  RESET_BUTTON_TEXT,
  TEST_ID_FIVE_HOUR_PREFIX,
  TEST_ID_FIVE_MINUTE_PREFIX,
  TEST_ID_SINGLE_HOUR_PREFIX,
  TEST_ID_SINGLE_MINUTE_PREFIX,
  TIME_INPUT_LABEL,
  TIME_INPUT_PLACEHOLDER,
  TIME_PAD_CHARACTER,
  TIME_PAD_LENGTH,
} from '../constants';
import './BerlinClock.css';
import { useState } from 'react';

const getTimeString = (hours: number, minutes: number, seconds: number) => {
  const paddedHours = String(hours).padStart(TIME_PAD_LENGTH, TIME_PAD_CHARACTER);
  const paddedMinutes = String(minutes).padStart(TIME_PAD_LENGTH, TIME_PAD_CHARACTER);
  const paddedSeconds = String(seconds).padStart(TIME_PAD_LENGTH, TIME_PAD_CHARACTER);
  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};

const parseTimeString = (value: string): CurrentTime | null => {
  const normalizedValue = value.trim();
  const match = normalizedValue.match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/);
  if (!match) return null;

  const parsedHours = Number(match[1]);
  const parsedMinutes = Number(match[2]);
  const parsedSeconds = Number(match[3]);

  if (
    parsedHours < 0 || parsedHours > 23 ||
    parsedMinutes < 0 || parsedMinutes > 59 ||
    parsedSeconds < 0 || parsedSeconds > 59
  ) {
    return null;
  }

  return {
    hours: parsedHours,
    minutes: parsedMinutes,
    seconds: parsedSeconds,
  };
};

export function BerlinClock() {
  const currentTime = useCurrentTime();
  const [manualTime, setManualTime] = useState<CurrentTime | null>(null);
  const [timeInputValue, setTimeInputValue] = useState<string>(getTimeString(currentTime.hours, currentTime.minutes, currentTime.seconds));

  const displayTime = manualTime ?? currentTime;
  const inputValue = manualTime ? timeInputValue : getTimeString(currentTime.hours, currentTime.minutes, currentTime.seconds);

  const handleTimeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setTimeInputValue(nextValue);

    const parsedTime = parseTimeString(nextValue);
    if (parsedTime) {
      setManualTime(parsedTime);
    }
  };

  const handleResetClick = () => {
    setManualTime(null);
  };

  const isSecondsOn = isSecondsLampOn(displayTime.seconds);
  const fiveHourLamps = getFiveHourLamps(displayTime.hours);
  const singleHourLamps = getSingleHourLamps(displayTime.hours);
  const fiveMinuteLamps = getFiveMinuteLamps(displayTime.minutes);
  const singleMinuteLamps = getSingleMinuteLamps(displayTime.minutes);

  return (
    <div className={CLASS_BERLIN_CLOCK}>
      <div className="time-controls" aria-label={INPUT_BUTTON_GROUP_LABEL}>
        <label className="time-input-label" htmlFor="berlin-time-input">
          {TIME_INPUT_LABEL}
        </label>
        <input
          id="berlin-time-input"
          className="time-input"
          type="text"
          value={inputValue}
          placeholder={TIME_INPUT_PLACEHOLDER}
          onChange={handleTimeInputChange}
        />
        <button className="time-reset-button" type="button" onClick={handleResetClick}>
          {RESET_BUTTON_TEXT}
        </button>
      </div>
      <div
        className={`${CLASS_SECONDS_CIRCLE} ${isSecondsOn ? CLASS_ON : CLASS_OFF}`}
        aria-label={`${ARIA_SECONDS_LAMP} 0 ${isSecondsOn ? 'on' : 'off'}`}
      />
      <div className="hours-row" aria-label={ARIA_FIVE_HOUR_ROW}>
        {fiveHourLamps.map((lampOn, lampIndex) => (
          <span
            key={lampIndex}
            className={`${CLASS_HOUR_LAMP} ${lampOn ? CLASS_ON : CLASS_OFF}`}
            data-testid={`${TEST_ID_FIVE_HOUR_PREFIX}${lampIndex}`}
            aria-label={`${ARIA_FIVE_HOUR_ROW} ${lampIndex} ${lampOn ? 'on' : 'off'}`}
          />
        ))}
      </div>
      <div className="hours-row" aria-label={ARIA_SINGLE_HOUR_ROW}>
        {singleHourLamps.map((lampOn, lampIndex) => (
          <span
            key={lampIndex}
            className={`${CLASS_HOUR_LAMP} ${lampOn ? CLASS_ON : CLASS_OFF}`}
            data-testid={`${TEST_ID_SINGLE_HOUR_PREFIX}${lampIndex}`}
            aria-label={`${ARIA_SINGLE_HOUR_ROW} ${lampIndex} ${lampOn ? 'on' : 'off'}`}
          />
        ))}
      </div>
      <div className="minutes-row" aria-label={ARIA_FIVE_MINUTE_ROW}>
        {fiveMinuteLamps.map((lampOn, lampIndex) => (
          <span
            key={lampIndex}
            className={`${CLASS_MINUTE_LAMP} ${lampOn ? CLASS_ON : CLASS_OFF} ${lampIndex % QUARTER_MINUTE_DIVISOR === QUARTER_MINUTE_REMAINDER ? CLASS_QUARTER : ''}`}
            data-testid={`${TEST_ID_FIVE_MINUTE_PREFIX}${lampIndex}`}
            aria-label={`${ARIA_FIVE_MINUTE_ROW} ${lampIndex} ${lampOn ? 'on' : 'off'}`}
          />
        ))}
      </div>
      <div className="minutes-row" aria-label={ARIA_SINGLE_MINUTE_ROW}>
        {singleMinuteLamps.map((lampOn, lampIndex) => (
          <span
            key={lampIndex}
            className={`${CLASS_MINUTE_LAMP} ${lampOn ? CLASS_ON : CLASS_OFF}`}
            data-testid={`${TEST_ID_SINGLE_MINUTE_PREFIX}${lampIndex}`}
            aria-label={`${ARIA_SINGLE_MINUTE_ROW} ${lampIndex} ${lampOn ? 'on' : 'off'}`}
          />
        ))}
      </div>
      <div className="current-time">{CURRENT_TIME_LABEL_TEXT} {getTimeString(displayTime.hours, displayTime.minutes, displayTime.seconds)}</div>
    </div>
  );
}

export default BerlinClock;
