import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { getAccessTokenSelector, getUserSelector } from '../../../redux/slices/userSlice';
import { withQuery } from '../../HOCs/withQuery';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import styles from './mySurveys.module.css';
import { SurveyItem } from './SurveyItem';

function MySurveysInner({ data }) {
  if (!data.length) {
    return (
      <MainWrap>
        <h1>Опросов не найдено...</h1>
      </MainWrap>
    );
  }

  return (
    <MainWrap>
      <div className={styles.mySurveysPage}>
        <h1>Мои опросы</h1>
        <ul>
          {data.map((survey) => (
            <SurveyItem
              key={survey.surveyId}
              survey={survey}
            />
          ))}
        </ul>
      </div>
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
    queryKey: ['SurveysByAuthorFetch', userId],
    queryFn: () => teamProjectApi.getSurveysByAuthor(userId, accessToken),
  });
  // console.log({ data });

  useEffect(() => {
    // console.log('MySurveysPage', { userId });
    if (!userId) navigate('/signin');
  }, [userId]);

  return (userId
    && (
      <MySurveysInnerWithQuery
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={refetch}
      />
    )
  );
}
