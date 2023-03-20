import styles from './buttonWhite.module.css';

export function ButtonWhite({ children, type, onClick }) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
