import { getReceivedNoun, getVotesNoun } from '../../../utils/helper';
import styles from './surveyTotalVotes.module.css';

export function SurveyTotalVotes({ counter }) {
  const message = `Всего ${getReceivedNoun(counter)} ${counter} ${getVotesNoun(counter)}`;
  return (
    <div className={styles.votes}>{message}</div>
  );
}
