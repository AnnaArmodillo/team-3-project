/* eslint-disable linebreak-style */
import { useNavigate } from 'react-router-dom';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
// import styles from './mySurveys.module.css';

export function SurveyItem({
  survey,
}) {
  console.log();
  const navigate = useNavigate();

  const surveyInfoHandler = () => {
    navigate(`/servey/${survey.surveyId}`);
  };

  return (
    <div>
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
