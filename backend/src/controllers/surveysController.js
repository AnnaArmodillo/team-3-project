import crypto from 'crypto';
import { surveysValidationSchema } from '../validators/surveysValidator.js';
import { DB } from '../DB/db.js';
import { getUserIdFromToken, updateDB } from '../helper.js';

function getSurveyById(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userID = getUserIdFromToken(token);
    const surveyId = req.params.surveyId;
    const currentSurvey = DB.surveys.find(
      (survey) => survey.surveyId === surveyId
    );
    if (currentSurvey) {
      if (!currentSurvey.visited.includes(userID)) {
        currentSurvey.visited.push(userID);
        const newContent = `export const DB = ${JSON.stringify(DB)}`;
        updateDB(newContent);
      }
      return res.json(currentSurvey);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function addNewSurvey(req, res) {
  try {
    const { body } = req;
    const token = req.headers.authorization.split(' ')[1];
    const userId = getUserIdFromToken(token);
    let surveyData = {};
    try {
      surveyData = await surveysValidationSchema.validate(body, {
        abortEarly: false,
      });
    } catch (error) {
      const errorObject = error.inner.reduce((acc, el) => {
        typeof el.errors[0] !== 'object'
          ? acc.push(el.errors[0])
          : acc.push(el.type);
        return acc;
      }, []);
      return res.status(400).json(errorObject);
    }
    const newSurvey = {
      title: surveyData.surveyTitle,
      author: userId,
      surveyType: surveyData.surveyType,
      extraOption: surveyData.allowExtraOption,
      surveyId: `${surveyData.surveyType}${crypto.randomUUID()}`,
      done: [],
      visited: [],
      options: surveyData.options.map((option) => ({
        ...option,
        optionId: crypto.randomUUID(),
        checked: surveyData.surveyType === 'UC' ? '' : [],
      })),
    };
    DB.surveys.push(newSurvey);
    const newContent = `export const DB = ${JSON.stringify(DB)}`;
    updateDB(newContent);
    return res.status(201).json(newSurvey);
  } catch (error) {
    return res.sendStatus(500);
  }
}

function takeSurveyById(req, res) {
  try {
    const { body } = req;
    const token = req.headers.authorization.split(' ')[1];
    const userID = getUserIdFromToken(token);
    const surveyId = req.params.surveyId;
    try {
      const currentSurvey = DB.surveys.find(
        (survey) => survey.surveyId === surveyId
      );
      if (
        currentSurvey.done.includes(userID) ||
        (typeof currentSurvey.options[0].checked === 'string'
          ? currentSurvey.options.some((option) => option.checked === userID)
          : currentSurvey.options.some((option) => {
              option.checked.includes(userID);
            }))
      ) {
        return res.status(409).json('Вы уже проголосовали в этом опросе');
      }
      if (currentSurvey.surveyType === 'UC') {
        try {
          const checkedOption = currentSurvey.options.find(
            (option) => option.optionId === body.checked
          );
          checkedOption.checked = userID;
          currentSurvey.done.push(userID);
        } catch (error) {
          return res.status(404).json('Такого варианта ответа не существует');
        }
      } else {
        let optionsArray = [];
        typeof body.checked === 'string'
          ? optionsArray.push(body.checked)
          : (optionsArray = body.checked);
        currentSurvey.options.map((option) => {
          if (optionsArray.includes(option.optionId)) {
            option.checked.push(userID);
            if (!currentSurvey.done.includes(userID)) {
              currentSurvey.done.push(userID);
            }
          }
        });
      }
      const newContent = `export const DB = ${JSON.stringify(DB)}`;
      updateDB(newContent);
      return res.status(201).json(currentSurvey);
    } catch (error) {
      return res.status(404).json('Опрос не найден');
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}
function deleteSurveyFromVisited(req, res) {
  try {
    const { body } = req;
    const token = req.headers.authorization.split(' ')[1];
    const userID = getUserIdFromToken(token);
    const surveyId = req.params.surveyId;
    try {
      const currentSurvey = DB.surveys.find(
        (survey) => survey.surveyId === surveyId
      );
      currentSurvey.visited = currentSurvey.visited.filter((id) => id !== userID)
      const newContent = `export const DB = ${JSON.stringify(DB)}`;
      updateDB(newContent);
      return res.sendStatus(202);
    } catch (error) {
      return res.status(404).json('Опрос не найден');
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}
export const surveysController = {
  addNewSurvey,
  getSurveyById,
  takeSurveyById,
  deleteSurveyFromVisited
};
