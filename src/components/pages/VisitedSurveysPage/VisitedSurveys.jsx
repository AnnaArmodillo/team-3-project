import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import {
  getAccessTokenSelector, getUserSelector,
} from '../../../redux/slices/userSlice';
import { withQuery } from '../../HOCs/withQuery';
import { SurveyItem } from '../../molecules/SurveyItem/SurveyItem';
import { Title } from '../../molecules/Title/Title';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import styles from './visitedSurveys.module.css';

const VisitedSurveysInner = withQuery(({ data }) => {
  const user = useSelector(getUserSelector);
  // const navigate = useNavigate();
  // const clickBackHandler = () => {
  //   navigate(-1);
  // };

  const visitedSurveys = data.filter((survey) => survey.author !== user.id);

  return (
    <MainWrap>
      <section className={styles.visitedSurveys}>
        {/* <div className={styles.title}>
          <ArrowLeft clickBackHandler={clickBackHandler} />
          <h2>Посещенные опросы</h2>
        </div> */}
        <Title title="Посещенные опросы" />
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
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
}
