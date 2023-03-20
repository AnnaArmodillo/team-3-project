import styles from './mainWrap.module.css';

export function MainWrap({ children }) {
  return (
    <main className={styles.whiteBackground}>
      {children}
    </main>
  );
}
