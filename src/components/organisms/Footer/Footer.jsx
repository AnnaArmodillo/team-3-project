import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Link to="./contacts">
        <div className={styles.footerItem}>Контакты</div>
      </Link>
      <Link to="./surveys">
        <div className={styles.footerItem}>Все опросы</div>
      </Link>
      <Link to="./doc">
        <div className={styles.footerItem}>Справка</div>
      </Link>
    </footer>
  );
}
