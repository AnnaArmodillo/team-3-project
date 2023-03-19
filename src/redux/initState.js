import { LS_KEY } from './constants';
import { validateDataFromLS } from './utils/functions';

export const initState = {
  user: {
    name: '',
    email: '',
    id: '',
    accessToken: '',
    refreshToken: '',
  },
  survey: '',
};

export const getInitState = () => {
  const dataFromLS = window.localStorage.getItem(LS_KEY);
  if (dataFromLS && typeof JSON.parse(dataFromLS) === 'object') {
    const isDataFromLS = validateDataFromLS(initState, JSON.parse(dataFromLS));
    if (isDataFromLS) {
      return JSON.parse(dataFromLS);
    }
  }
  return initState;
};
