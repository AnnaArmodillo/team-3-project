import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { getAccessTokenSelector, getUserSelector } from '../../../redux/slices/userSlice';
import { withQuery } from '../../HOCs/withQuery';
// import styles from './mySurveys.module.css';
import { SurveyItem } from './SurveyItem';

function MySurveysInner({ data }) {
  if (!data.length) return <h1>Ничего не найдено...</h1>;

  return (
    <>
      <h1>Мои опросы</h1>
      <div>
        {data.map((survey) => (
          <SurveyItem
            key={survey.surveyId}
            survey={survey}
          />
        ))}
      </div>
    </>
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
  console.log({ data });

  useEffect(() => {
    console.log('MySurveysPage', { userId });
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
