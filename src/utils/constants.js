/* Survey Types */
export const SC = 'SC';
export const MC = 'MC';
export const UC = 'UC';

/* Screen Sizes for breakpoints */
export const SCREEN_SM = 576;
export const SCREEN_MD = 768;
export const SCREEN_LG = 992;
export const SCREEN_XL = 1200;
export const SCREEN_XXL = 1400;

/* Query Keys */
export const SURVEYS_CATALOG_PAGE = 'SurveysCatalogPage';

export function getQueryKey(search) {
  return ['userByEmail', search];
}
export function getQueryKeyUCSurvey(surveyID) {
  return ['UCSurvey', surveyID];
}
export function getQueryKeyImage(image, id) {
  return ['image', image, id];
}
export function getQueryKeySurveysByAuthor(userId) {
  return ['SurveysByAuthorFetch', userId];
}
export function getQueryKeyUser(userId) {
  return ['UserFetch', userId];
}
export function getQueryKeySСSurvey(surveyId) {
  return ['scSurvey', surveyId];
}
export function getQueryKeySurveysCatalog(search) {
  return [SURVEYS_CATALOG_PAGE, search];
}
export function getQueryKeyVisitedSurveys() {
  return ['VisitedSurveysFetch'];
}
export function getQueryKeyPhoto() {
  return ['photo'];
}
