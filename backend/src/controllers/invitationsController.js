import { DB } from '../DB/db.js';
import { getUserIdFromToken, updateDB } from '../helper.js';

function sendInvitations(req, res) {
  try {
    const { users, surveyId } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const userID = getUserIdFromToken(token);
    const usersSuccess = [];
    const usersFail = [];
    console.log(users);
    try {
      users.map((userFromReq) => {
        const currentUser = DB.users.find(
          (user) => user.email === userFromReq.email
        );
        if (currentUser) {
          currentUser.invitations.push({
            survey: surveyId,
            fromUser: userID,
          });
          usersSuccess.push(userFromReq.email);
        } else {
          usersFail.push(userFromReq.email);
        }
      });
      const newContent = `export const DB = ${JSON.stringify(DB)}`;
      updateDB(newContent);
    } catch (error) {
      return res.status(404).json('Пользователь с таким email не найден');
    }
    const response = { usersSuccess, usersFail };
    return res.status(201).json(response);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export const invitationsController = {
  sendInvitations,
};
