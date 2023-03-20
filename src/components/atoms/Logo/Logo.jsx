import styles from './logo.module.css';
import logo from './logo.png';

export function Logo({ clickHandler }) {
  return (
    <div className={styles.containerLogo} onClick={clickHandler}>
      <img src={logo} alt="логотип" />
      <h2>ARMADILLO</h2>
    </div>
  );
}
