export const SC = 'SC';
export const MC = 'MC';
export const UC = 'UC';
export function getQueryKey(search) {
  return ['userByEmail', search];
}
export function getQueryKeyUCSurvey(surveyID) {
  return ['UCSurvey', surveyID];
}
export function getQueryKeyImage(image) {
  return ['image', image];
}

export const SURVEYS_CATALOG_PAGE = 'SurveysCatalogPage';
