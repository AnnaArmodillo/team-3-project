import { useQuery } from '@tanstack/react-query';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { Loader } from '../../Loader/Loader';
import { SurveyItem } from '../../molecules/SurveyItem/SurveyItem';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import styles from './surveysCatalogPage.module.css';

export function SurveysCatalogPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['SurveysCatalogPage'],
    queryFn: () => teamProjectApi.getAllSurveys(),
  });
  if (isLoading) {
    return (
      <MainWrap>
        <Loader />
      </MainWrap>
    );
  }
  if (isError) {
    return (
      <MainWrap>
        <h1>
          Произошла ошибка
          {' '}
          {error.message}
        </h1>
      </MainWrap>
    );
  }
  // console.log({ data });
  if (data) {
    return (
      <MainWrap>
        <div className={styles.surveysCatalogPage}>
          <h1>Все опросы</h1>
          <div className={styles.surveysCatalogContainer}>
            {data.map((survey) => (
              <div key={survey.surveyId} className={styles.surveyWr}>
                <SurveyItem survey={survey} />
              </div>
            ))}
          </div>
        </div>
      </MainWrap>
    );
  }
}
