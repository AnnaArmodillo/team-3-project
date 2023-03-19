import { getVotesNoun } from '../../../utils/helper';
import styles from './surveyOptionResult.module.css';

export function SurveyOptionResult({ successRate, votesNumber }) {
  return (
    <div className={styles.result}>
      {successRate}
      % (
      {votesNumber}
      {' '}
      {getVotesNoun(votesNumber)}
      )
    </div>
  );
}
