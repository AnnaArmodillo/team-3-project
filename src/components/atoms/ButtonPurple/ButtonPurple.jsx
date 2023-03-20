import styles from './buttonPurple.module.css';

export function ButtonPurple({
  children, type, onClick, disabled,
}) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
