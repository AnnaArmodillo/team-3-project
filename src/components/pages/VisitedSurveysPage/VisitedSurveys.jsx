import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import {
  getAccessTokenSelector,
  getUserSelector,
} from '../../../redux/slices/userSlice';
import { ArrowLeft } from '../../atoms/ArrowLeft/ArrowLeft';
import { withQuery } from '../../HOCs/withQuery';
import { SurveyItem } from '../../molecules/SurveyItem/SurveyItem';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import styles from './visitedSurveys.module.css';

const VisitedSurveysInner = withQuery(({ visitedSurveys }) => {
  const navigate = useNavigate();
  const clickBackHandler = () => {
    navigate(-1);
  };

  return (
    <MainWrap>
      <section className={styles.visitedSurveys}>
        <div className={styles.title}>
          <ArrowLeft clickBackHandler={clickBackHandler} />
          <h2>Посещенные опросы</h2>
        </div>
        {!visitedSurveys.length && (
          <p>
            Здесь появятся опросы, в которых вы проголосуете или просто просмотрите
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
  const user = useSelector(getUserSelector);
  const userId = user.id;
  const navigate = useNavigate();

  const {
    data, isLoading, isFetching, isError, error, refetch,
  } = useQuery({
    queryKey: ['VisitedSurveysFetch'],
    queryFn: () => teamProjectApi.getVisitedSurveys(accessToken),
  });

  useEffect(() => {
    if (!userId) navigate('/signin');
  }, [userId]);

  return (
    <VisitedSurveysInner
      visitedSurveys={data}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
}
