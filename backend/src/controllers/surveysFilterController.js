import { DB } from '../DB/db.js';
import { getUserIdFromToken } from '../helper.js';

function getVisitedSurveys(req, res) {
  try {
    const id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const userID = getUserIdFromToken(token);
    return res.json(
      DB.surveys.filter((survey) => {
        if (survey.visited.includes(userID)) return survey;
      })
    );
  } catch (error) {
    return res.sendStatus(500);
  }
}

function getSurveysByAuthor(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userID = getUserIdFromToken(token);
    return res.json(
      DB.surveys.filter((survey) => {
        if (survey.author === userID) return survey;
      })
    );
  } catch (error) {
    return res.sendStatus(500);
  }
}

function searchSurveysDB(req, res) {
  try {
    const { title } = req.query;
    return res.json(
      DB.surveys.filter((survey) => {
        if (survey.title.includes(title)) return survey;
      })
    );
  } catch (error) {
    return res.sendStatus(500);
  }
}

export const surveysFilterController = {
  getVisitedSurveys,
  getSurveysByAuthor,
  searchSurveysDB,
};
