import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

const surveySlice = createSlice({
  name: 'survey',
  initialState: initState.survey,
  reducers: {
    setSurvey(_, action) {
      return action.payload;
    },
  },
});

export const { setSurvey } = surveySlice.actions;

export const getSurveySelector = (state) => state.survey;

export const surveyReducer = surveySlice.reducer;
