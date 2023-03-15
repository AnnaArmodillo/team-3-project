import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { ButtonWhite } from '../../atoms/ButtonWhite/ButtonWhite';
import { Logo } from '../../atoms/Logo/Logo';

export function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <Logo />
      </Link>
      <div className={styles.containerAdmission}>
        <ButtonWhite type="button"><Link to="/signin">Войти</Link></ButtonWhite>
      </div>
    </header>
  );
}
