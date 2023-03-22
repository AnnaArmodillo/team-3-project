import { configureStore } from '@reduxjs/toolkit';
import { LS_KEY } from './constants';
import { getInitState } from './initState';
import { filterReducer } from './slices/filterSlice';
import { surveyReducer } from './slices/surveySlice';
import { userReducer } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    survey: surveyReducer,
    filter: filterReducer,
  },
  preloadedState: getInitState(),
});

store.subscribe(() => {
  window.localStorage.setItem(LS_KEY, JSON.stringify(store.getState()));
});
