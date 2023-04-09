import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from '../../atoms/ArrowLeft/ArrowLeft';
import styles from './title.module.css';

export function Title({ title }) {
  const navigate = useNavigate();
  const { state: locationState } = useLocation();
  const clickBackHandler = () => {
    if (locationState?.from) {
      return navigate(locationState.from);
    }
    return navigate(-1 ?? '/');
  };

  return (
    <div className={styles.title}>
      <ArrowLeft clickBackHandler={clickBackHandler} />
      <h2 className={styles.h2}>{title}</h2>
    </div>
  );
}
