import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';
import { ButtonWhite } from '../../atoms/ButtonWhite/ButtonWhite';
import { Logo } from '../../atoms/Logo/Logo';
import { getAccessTokenSelector } from '../../../redux/slices/userSlice';

export function Header() {
  const accessToken = useSelector(getAccessTokenSelector);
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.containerLogo}>
        <Link to="/" state={{ from: pathname }}>
          <Logo />
        </Link>
      </div>
      <div className={styles.containerAdmission}>
        {accessToken ? (
          <Link to="/profile" state={{ from: pathname }}>
            <ButtonWhite type="button"><i className="fa-regular fa-user" /></ButtonWhite>
          </Link>
        ) : (
          <Link to="/signin" state={{ from: pathname }}>
            <ButtonWhite type="button">Войти</ButtonWhite>
          </Link>
        )}
      </div>
    </header>
  );
}
