import { Tooltip } from '../../atoms/Tooltip/Tooltip';

export function RequiredFieldTooltip() {
  const tool = (<sup>&#9913;</sup>);
  const tip = 'Этот элемент является обязательным';
  return (
    <Tooltip
      tool={tool}
      tip={tip}
    />
  );
}
