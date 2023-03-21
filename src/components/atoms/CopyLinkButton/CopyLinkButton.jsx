import { getSurveyURL } from '../../../utils/helper';
import styles from './copyLinkButton.module.css';

export function CopyLinkButton({ surveyId }) {
  return (
    <button
      type="button"
      title="копировать ссылку"
      className={styles.buttonCopy}
      onClick={() => navigator.clipboard.writeText(getSurveyURL(surveyId))}
    >
      <i className="fa-solid fa-copy" />
    </button>
  );
}
