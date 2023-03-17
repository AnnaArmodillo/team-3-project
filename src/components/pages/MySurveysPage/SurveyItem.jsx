/* eslint-disable linebreak-style */
import { useNavigate } from 'react-router-dom';
import { getSurveyURL } from '../../../utils/helper';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import styles from './mySurveys.module.css';

export function SurveyItem({
  survey,
}) {
  const navigate = useNavigate();
  const route = getSurveyURL(survey.surveyId).slice(21);

  const surveyInfoHandler = () => {
    navigate(route);
  };

  return (
    <div className={styles.mySurveysItem}>
      <b>{survey.title}</b>
      {' '}
      {survey.surveyType}
      {' '}
      <ButtonPurple onClick={surveyInfoHandler} type="button">
        Подробнее
      </ButtonPurple>
    </div>
  );
}
