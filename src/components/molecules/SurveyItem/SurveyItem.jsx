import { Link } from 'react-router-dom';
import { getSurveyURL } from '../../../utils/helper';
import styles from './surveyItem.module.css';

export function SurveyItem({ survey }) {
  const formatSurveysType = () => {
    let type = '';
    switch (survey.surveyType) {
      case 'SC':
        type = 'единственный тип выбора';
        break;
      case 'MC':
        type = 'множественный тип выбора';
        break;
      case 'UC':
        type = 'уникальный тип выбора';
        break;

      default:
        break;
    }
    return type;
  };

  return (
    <Link to={getSurveyURL(survey.surveyId)}>
      <div className={styles.surveyItem}>
        <div className={styles.containerTop}>
          <h5>{survey.title}</h5>
          <div className={styles.containerSubinfo}>
            <span>
              <i className="fa-solid fa-list-check" />
              {formatSurveysType()}
            </span>
            <span>
              <i className="fa-regular fa-clock" />
              <span className={styles.isOpen}>oткрыт</span>
            </span>
            <span>
              <i className="fa-regular fa-trash-can" />
              <span>удалить</span>
            </span>
          </div>
        </div>

        <div className={styles.containerBottom}>
          здесь будет аватар и имя автора опроса
        </div>
      </div>
    </Link>
  );
}
