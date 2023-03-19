import { DB } from '../DB/db.js';
import { getUserIdFromToken, updateDB } from '../helper.js';

function sendInvitations(req, res) {
  try {
    const { users, surveyId } = req.body;
    console.log(users);
    console.log(surveyId);
    const token = req.headers.authorization.split(' ')[1];
    const userID = getUserIdFromToken(token);
    try {
      users.map((userFromReq) => {
        const currentUser = DB.users.find((user) => user.email === userFromReq.email);
        console.log(currentUser)
        currentUser.invitations.push({
          survey: surveyId,
          fromUser: userID,
        })
      });
      const newContent = `export const DB = ${JSON.stringify(DB)}`;
      updateDB(newContent);
    } catch (error) {
      return res.status(404).json(`Пользователь с таким email не найден`);
    }
    return res.json(
      'fffff'
    );
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

export const invitationsController = {
    sendInvitations,
};
