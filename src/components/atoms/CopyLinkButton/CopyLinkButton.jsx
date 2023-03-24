import { Slide, toast } from 'react-toastify';
import { getSurveyURL } from '../../../utils/helper';
import styles from './copyLinkButton.module.css';

export function CopyLinkButton({ surveyId }) {
  const customId = 'toastId';
  return (
    <button
      type="button"
      title="копировать ссылку"
      className={styles.buttonCopy}
      onClick={() => {
        navigator.clipboard.writeText(getSurveyURL(surveyId));
        toast.success('Ссылка скопирована', {
          autoClose: 2000,
          transition: Slide,
          className: `${styles.toast}`,
          bodyClassName: `${styles.toastBody}`,
          toastId: customId,
          hideProgressBar: true,
          theme: 'colored',
          closeButton: false,
          rtl: false,
        });
      }}
    >
      <i className="fa-solid fa-copy" />
    </button>
  );
}
