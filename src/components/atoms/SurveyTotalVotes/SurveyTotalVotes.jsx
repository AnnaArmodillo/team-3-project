import { getReceivedNoun, getVotesNoun } from '../../../utils/helper';
import styles from './surveyTotalVotes.modules.css';

export function SurveyTotalVotes({ counter }) {
  const message = `Всего ${getReceivedNoun(counter)} ${counter} ${getVotesNoun(counter)}`;
  return (
    <div className={styles.votes}>{message}</div>
  );
}
