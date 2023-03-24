import { Router } from 'express';
import { surveysFilterController } from '../controllers/surveysFilterController.js';

export const surveysOpenSearchRouter = Router();

surveysOpenSearchRouter.get(
  '/',
  surveysFilterController.searchSurveysDB
);
