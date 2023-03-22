import { MC, SC, UC } from '../../../utils/constants';

const MC_FILTER = {
  type: MC,
  name: 'Множественный выбор',
};

const SC_FILTER = {
  type: SC,
  name: 'Единственный выбор',
};

const UC_FILTER = {
  type: UC,
  name: 'Уникальный выбор',
};

export const FILTERS_BY_TYPE = [MC_FILTER, SC_FILTER, UC_FILTER];

export const FILTER_QUERY_NAME = 'surveyType';

export const getFilteredSurveys = ([...surveys], filterType) => {
  switch (filterType) {
    case MC_FILTER.type:
      return surveys.filter((survey) => (survey.surveyType === MC));
    case SC_FILTER.type:
      return surveys.filter((survey) => (survey.surveyType === SC));
    case UC_FILTER.type:
      return surveys.filter((survey) => (survey.surveyType === UC));
    default:
      return surveys;
  }
};
