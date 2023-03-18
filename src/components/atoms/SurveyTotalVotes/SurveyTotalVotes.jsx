import styles from './surveyTotalVotes.modules.css';

export function SurveyTotalVotes({ counter }) {
  const message = `Всего получено ${counter} голосов`;
  return (
    <div className={styles.votes}>{message}</div>
  );
}
