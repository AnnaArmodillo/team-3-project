import { DB } from '../DB/db.js';
import { getUserIdFromToken, updateDB } from '../helper.js';

function sendInvitations(req, res) {
  try {
    const { body } = req;
    const token = req.headers.authorization.split(' ')[1];
    const userID = getUserIdFromToken(token);
    // const 
    return res.json(
      DB.surveys.filter((survey) => {
        if (survey.visited.includes(userID)) return survey;
      })
    );
  } catch (error) {
    return res.sendStatus(500);
  }
}

// function getSurveysByAuthor(req, res) {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const userID = getUserIdFromToken(token);
//     return res.json(
//       DB.surveys.filter((survey) => {
//         if (survey.author === userID) return survey;
//       })
//     );
//   } catch (error) {
//     return res.sendStatus(500);
//   }
// }

export const invitationsController = {
    sendInvitations,
};
