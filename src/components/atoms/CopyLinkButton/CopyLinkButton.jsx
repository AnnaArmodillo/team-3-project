import { Slide, toast, ToastContainer } from 'react-toastify';
import { getSurveyURL } from '../../../utils/helper';
import styles from './copyLinkButton.module.css';

export function CopyLinkButton({ surveyId }) {
  const customId = 'custom-id-yes';
  return (
    <>
      <button
        type="button"
        title="копировать ссылку"
        className={styles.buttonCopy}
        onClick={() => {
          navigator.clipboard.writeText(getSurveyURL(surveyId));
          toast.success('Ссылка скопирована', {
            autoClose: 2000,
            transition: Slide,
            bodyClassName: `${styles.toastBody}`,
            toastId: customId,
            theme: 'colored',
            closeButton: false,
            rtl: true,
          });
        }}
      >
        <i className="fa-solid fa-copy" />
      </button>
      <ToastContainer
        className={styles.toast}
        autoClose
      />
    </>
  );
}
