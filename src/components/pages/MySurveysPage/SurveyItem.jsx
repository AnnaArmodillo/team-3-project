/* eslint-disable linebreak-style */
import styles from './mySurveys.module.css';

export function SurveyItem({
  survey,
}) {
  console.log();
  return (
    <div className={styles.mySurveysPage}>
      <h2>{survey.title}</h2>
      <p>{survey.surveyType}</p>
      {survey.options.map((option) => (
        <p key={option.optionId}>{JSON.stringify(option)}</p>
      ))}
      <div>{JSON.stringify(survey)}</div>
    </div>
  );
}
