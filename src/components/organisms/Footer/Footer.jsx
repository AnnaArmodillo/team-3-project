import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.css';

export function Footer() {
  const { pathname } = useLocation();
  return (
    <footer className={styles.footer}>
      <Link to="./contacts" state={{ from: pathname }}>
        <div className={styles.footerItem}>Контакты</div>
      </Link>
      <Link to="./surveys" state={{ from: pathname }}>
        <div className={styles.footerItem}>Все опросы</div>
      </Link>
      <Link to="./doc" state={{ from: pathname }}>
        <div className={styles.footerItem}>Справка</div>
      </Link>
    </footer>
  );
}
