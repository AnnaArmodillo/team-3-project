import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { getSearchSelector } from '../../../redux/slices/filterSlice';
import { ButtonWhite } from '../../atoms/ButtonWhite/ButtonWhite';
import { getQueryKeySurveysCatalog } from '../../../utils/constants';
import { withQuery } from '../../HOCs/withQuery';
import { SurveyItem } from '../../molecules/SurveyItem/SurveyItem';
import Search from '../../organisms/Search/Search';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import { FILTER_QUERY_NAME, getFilteredSurveys } from '../Filters/constants';
import { Filters } from '../Filters/Filters';
import styles from './surveysCatalogPage.module.css';

function SurveysCatalogPageInner({ surveys, search }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFiltersOpening = () => {
    setIsOpen((prev) => !prev);
  };
  if (surveys) {
    return (
      <MainWrap>
        <div className={styles.surveysCatalogPage}>
          <div className={styles.flex}>
            <Search />
            <ButtonWhite onClick={handleFiltersOpening}>
              {!isOpen ? (
                <>
                  <span className={styles.filtersOpeningButtonName}>Показать фильтры</span>
                  <i className="fa-solid fa-chevron-down" />
                </>
              ) : (
                <>
                  <span className={styles.filtersOpeningButtonName}>Скрыть фильтры</span>
                  <i className="fa-solid fa-chevron-up" />
                </>
              )}
            </ButtonWhite>
          </div>
          {isOpen && (<div className={classNames(styles.flex, styles.filters)}><Filters /></div>)}
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
  const search = useSelector(getSearchSelector);
  const [searchParams] = useSearchParams();
  const currentFilterNameFromQuery = searchParams.get(FILTER_QUERY_NAME);

  const {
    data: surveys = [],
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: getQueryKeySurveysCatalog(search),
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
    queryKey: getQueryKeySurveysCatalog(search),
    queryFn: () => teamProjectApi.searchSurveys(search),
    enabled: !!search,
  });

  let filteredSurveys = [];
  if (search) {
    filteredSurveys = getFilteredSurveys(surveysFromSearch, currentFilterNameFromQuery);
    return (
      <SurveysCatalogPageInnerWithQuery
        surveys={filteredSurveys}
        isError={isErrorFromSearch}
        isLoading={isLoadingFromSearch}
        error={errorFromSearch}
        refetch={refetchFromSearch}
        search={search}
      />
    );
  }
  if (currentFilterNameFromQuery) {
    filteredSurveys = getFilteredSurveys(surveys, currentFilterNameFromQuery);
  } else { filteredSurveys = surveys; }
  return (
    <SurveysCatalogPageInnerWithQuery
      surveys={filteredSurveys}
      isError={isError}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      search={search}
    />
  );
}

export default SurveysCatalogPage;
