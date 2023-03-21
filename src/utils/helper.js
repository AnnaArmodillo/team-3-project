export function getSurveyURL(surveyId) {
  const route = surveyId.slice(0, 2).toLowerCase();
  const surveyURL = `http://localhost:3000/surveys/${route}/${surveyId}`;
  return surveyURL;
}

export function getVotesNoun(votesNumber) {
  if (+votesNumber === 0) return 'голосов';
  let n = Math.abs(+votesNumber);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return 'голосов';
  }
  n %= 10;
  if (n === 1) {
    return 'голос';
  }
  if (n >= 2 && n <= 4) {
    return 'голоса';
  }
  return 'голосов';
}

export function getReceivedNoun(votesNumber) {
  if (+votesNumber === 0) return 'получено';
  let n = Math.abs(+votesNumber);
  n %= 10;
  if (n === 1) {
    return 'получен';
  }
  return 'получено';
}

export const getOptionSuccessRate = (votes, votesTotal) => {
  if (votes === 0) {
    return 0;
  }
  return ((votes * 100) / votesTotal);
};

export function isAuthor(author, id) {
  if (author === id) {
    return true;
  }
  return false;
}
