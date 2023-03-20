import { Router } from 'express';
import { checkAuth } from '../checkAuth.js';
import { surveysFilterController } from '../controllers/surveysFilterController.js';

export const surveysFilterRouter = Router();

surveysFilterRouter.get(
  '/',
  checkAuth,
  surveysFilterController.getVisitedSurveys
);
surveysFilterRouter.get(
  '/:author',
  checkAuth,
  surveysFilterController.getSurveysByAuthor
);
