import styles from './tooltip.module.css';

export function Tooltip({ tool, tip }) {
  return (
    <span className={styles.tool}>
      {tool}
      <span className={styles.tip}>
        {tip}
      </span>
    </span>
  );
}
