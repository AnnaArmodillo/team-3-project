import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import {
  getAccessTokenSelector,
} from '../../../redux/slices/userSlice';
import { ArrowLeft } from '../../atoms/ArrowLeft/ArrowLeft';
import { withQuery } from '../../HOCs/withQuery';
import { SurveyItem } from '../../molecules/SurveyItem/SurveyItem';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import styles from './visitedSurveys.module.css';

const VisitedSurveysInner = withQuery(({ visitedSurveys }) => {
  // const user = useSelector(getUserSelector);
  const navigate = useNavigate();
  const clickBackHandler = () => {
    navigate(-1);
  };

  // const visitedSurveys = data.filter((survey) => survey.author !== user.id);
  console.log({ visitedSurveys });
  return (
    <MainWrap>
      <section className={styles.visitedSurveys}>
        <div className={styles.title}>
          <ArrowLeft clickBackHandler={clickBackHandler} />
          <h2>Посещенные опросы</h2>
        </div>
        {!visitedSurveys.length && (
          <p>
            Здесь появятся просмотренные опросы
          </p>
        )}
        {!!visitedSurveys.length && (
          <div className={styles.listSurveys}>
            {visitedSurveys.map((survey) => (
              <SurveyItem key={survey.surveyId} survey={survey} />
            ))}
          </div>
        )}
      </section>
    </MainWrap>
  );
});

export function VisitedSurveys() {
  const accessToken = useSelector(getAccessTokenSelector);

  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['VisitedSurveysFetch'],
    queryFn: () => teamProjectApi.getVisitedSurveys(accessToken),
  });

  return (
    <VisitedSurveysInner
      visitedSurveys={data}
      isLoading={isLoading}
      // isFetching={isFetching}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
}
