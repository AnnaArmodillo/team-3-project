export function getSurveyURL(surveyId) {
  let route = '';
  switch (surveyId.slice(0, 2)) {
    case 'SC':
      route = 'sc';
      break;
    case 'MC':
      route = 'mc';
      break;
    case 'UC':
      route = 'uc';
      break;

    default:
      break;
  }
  const surveyURL = `http://localhost:3000/surveys/${route}/${surveyId}`;
  return surveyURL;
}
