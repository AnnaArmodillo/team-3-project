import classNames from 'classnames';
import styles from './arrowLeft.module.css';

export function ArrowLeft({ clickBackHandler }) {
  return (
    <i
      onClick={clickBackHandler}
      className={classNames('fa-solid fa-arrow-left', styles.arrowLeft)}
    />
  );
}
