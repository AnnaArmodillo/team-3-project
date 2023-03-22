import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { getAccessTokenSelector, getUserSelector } from '../../../redux/slices/userSlice';
import { getQueryKeySurveysByAuthor } from '../../../utils/constants';
import { ArrowLeft } from '../../atoms/ArrowLeft/ArrowLeft';
import { withQuery } from '../../HOCs/withQuery';
import { SurveyItem } from '../../molecules/SurveyItem/SurveyItem';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import styles from './mySurveys.module.css';

function MySurveysInner({ mySurveys }) {
  const navigate = useNavigate();
  const clickBackHandler = () => {
    navigate(-1);
  };

  return (
    <MainWrap>
      <section className={styles.mySurveys}>
        <div className={styles.title}>
          <ArrowLeft clickBackHandler={clickBackHandler} />
          <h2>Мои опросы</h2>
        </div>
        {!mySurveys.length && (
          <p>
            Здесь появятся созданные вами опросы
          </p>
        )}
        {!!mySurveys.length && (
          <div className={styles.listSurveys}>
            {mySurveys.map((survey) => (
              <SurveyItem key={survey.surveyId} survey={survey} />
            ))}
          </div>
        )}
      </section>
    </MainWrap>
  );
}

const MySurveysInnerWithQuery = withQuery(MySurveysInner);

export function MySurveys() {
  const navigate = useNavigate();
  const user = useSelector(getUserSelector);
  const accessToken = useSelector(getAccessTokenSelector);
  const userId = user.id;

  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: getQueryKeySurveysByAuthor(userId),
    queryFn: () => teamProjectApi.getSurveysByAuthor(userId, accessToken),
  });

  useEffect(() => {
    if (!userId) navigate('/signin');
  }, [userId]);

  return (userId
    && (
      <MySurveysInnerWithQuery
        mySurveys={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={refetch}
      />
    )
  );
}
