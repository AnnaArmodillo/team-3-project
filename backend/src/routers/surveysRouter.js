import { Router } from 'express';
import { checkAuth } from '../checkAuth.js';
import { surveysController } from '../controllers/surveysController.js';

export const surveysRouter = Router();
surveysRouter.get('/', surveysController.getAllSurveys)
surveysRouter.post('/', checkAuth, surveysController.addNewSurvey);
surveysRouter.get('/:surveyId', checkAuth, surveysController.getSurveyById);
surveysRouter.put('/:surveyId', checkAuth, surveysController.takeSurveyById);
surveysRouter.patch('/:surveyId', checkAuth, surveysController.deleteSurveyFromVisited);
