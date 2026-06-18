import { CLASS_OFF, CLASS_ON } from '../constants';

type LampRowProps = {
  rowClassName: string;
  rowAriaLabel: string;
  lampStates: boolean[];
  lampClassName: string;
  testIdPrefix: string;
  ariaLabelPrefix: string;
  additionalLampClass?: (lampIndex: number) => string;
};

export function LampRow({
  rowClassName,
  rowAriaLabel,
  lampStates,
  lampClassName,
  testIdPrefix,
  ariaLabelPrefix,
  additionalLampClass,
}: LampRowProps) {
  return (
    <div className={rowClassName} aria-label={rowAriaLabel}>
      {lampStates.map((lampOn, lampIndex) => (
        <span
          key={lampIndex}
          className={`${lampClassName} ${lampOn ? CLASS_ON : CLASS_OFF} ${additionalLampClass?.(lampIndex) ?? ''}`}
          data-testid={`${testIdPrefix}${lampIndex}`}
          aria-label={`${ariaLabelPrefix} ${lampIndex} ${lampOn ? 'on' : 'off'}`}
        />
      ))}
    </div>
  );
}
