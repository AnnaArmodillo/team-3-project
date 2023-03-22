import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { getSearchSelector } from '../../../redux/slices/filterSlice';
import { getAccessTokenSelector } from '../../../redux/slices/userSlice';
import { SURVEYS_CATALOG_PAGE } from '../../../utils/constants';
import { withQuery } from '../../HOCs/withQuery';
import { SurveyItem } from '../../molecules/SurveyItem/SurveyItem';
import Search from '../../organisms/Search/Search';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import styles from './surveysCatalogPage.module.css';

function SurveysCatalogPageInner({ surveys, search }) {
  if (surveys) {
    return (
      <MainWrap>
        <div className={styles.surveysCatalogPage}>
          <Search />
          <h1>
            {search
              ? (
                ('Опросы по запросу')
              )
              : (
                ('Все опросы')
              )}
          </h1>
          <div className={styles.surveysCatalogContainer}>
            {surveys.map((survey) => (
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
const SurveysCatalogPageInnerWithQuery = withQuery(SurveysCatalogPageInner);
function SurveysCatalogPage() {
  const accessToken = useSelector(getAccessTokenSelector);
  const navigate = useNavigate();
  const search = useSelector(getSearchSelector);

  useEffect(() => {
    if (!accessToken) {
      navigate('/signin');
    }
  }, [accessToken]);

  const {
    data: surveys = [],
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [SURVEYS_CATALOG_PAGE, search],
    queryFn: () => teamProjectApi.getAllSurveys(),
    enabled: !search,
  });

  const {
    data: surveysFromSearch = [],
    isError: isErrorFromSearch,
    error: errorFromSearch,
    isLoading: isLoadingFromSearch,
    refetch: refetchFromSearch,
  } = useQuery({
    queryKey: [SURVEYS_CATALOG_PAGE, search],
    queryFn: () => teamProjectApi.searchSurveys(search),
    enabled: !!search,
  });

  if (search) {
    return (
      <SurveysCatalogPageInnerWithQuery
        surveys={surveysFromSearch}
        isError={isErrorFromSearch}
        isLoading={isLoadingFromSearch}
        error={errorFromSearch}
        refetch={refetchFromSearch}
        search={search}
      />
    );
  }

  return (
    <SurveysCatalogPageInnerWithQuery
      surveys={surveys}
      isError={isError}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      search={search}
    />
  );
}

export default SurveysCatalogPage;
