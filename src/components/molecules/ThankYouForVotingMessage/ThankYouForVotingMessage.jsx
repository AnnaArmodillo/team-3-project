import classNames from 'classnames';
import styles from './thankYouForVotingMessage.module.css';

export function ThankYouForVotingMessage() {
  return (
    <>
      <i className={classNames('fa-solid fa-heart-circle-check', styles.thankYou)} />
      <div>
        Спасибо за Ваше участие в этом опросе
      </div>
    </>
  );
}
