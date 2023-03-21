import { DB } from '../DB/db.js';
import { getUserIdFromToken, updateDB } from '../helper.js';

function sendInvitations(req, res) {
  try {
    const { users, surveyId } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const userID = getUserIdFromToken(token);
    const usersSuccess = [];
    const usersFail = [];
    const usersDouble = [];

    try {
      function isTheSameInvitation(invitation) {
        if (invitation.fromUser === userID && invitation.survey === surveyId) {
          return true;
        } else {
          return false;
        }
      }
      function isAlreadyInvited(currentUser) {
        const index = currentUser.invitations.find((invitation) => isTheSameInvitation(invitation));
          if (index) {
            return true;
          } else {
            return false;
          }
      }
      users.map((userFromReq) => {
        const currentUser = DB.users.find(
          (user) => user.email === userFromReq.email
        );
        if (currentUser && !isAlreadyInvited(currentUser)) {
          currentUser.invitations.push({
            survey: surveyId,
            fromUser: userID,
          });
          usersSuccess.push(userFromReq.email);
        } else if (currentUser && isAlreadyInvited(currentUser)) {
          usersDouble.push(userFromReq.email);
        } else {
          usersFail.push(userFromReq.email);
        }
      });
      const newContent = `export const DB = ${JSON.stringify(DB)}`;
      updateDB(newContent);
    } catch (error) {
      return res.status(404).json('Пользователь с таким email не найден');
    }
    const response = { usersSuccess, usersFail, usersDouble };
    return res.status(201).json(response);
  } catch (error) {
    return res.sendStatus(500);
  }
}

function deleteInvitation(req, res) {
  try {
    const { fromUser, survey } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const userID = getUserIdFromToken(token);
    const currentUser = DB.users.find((user) => user.id === userID);
    function isCurrentInvitation(invitation) {
      if (invitation.fromUser === fromUser && invitation.survey === survey) {
        return true;
      } else {
        return false;
      }
    }
    const currentInvitationIndex = currentUser.invitations.findIndex(
      (invitation) => isCurrentInvitation(invitation)
    );
    if (currentInvitationIndex === -1) {
      return res.sendStatus(202);
    } else {
      const filteredInvitations = [
        ...currentUser.invitations.slice(0, currentInvitationIndex),
        ...currentUser.invitations.slice(currentInvitationIndex + 1),
      ];
      currentUser.invitations = filteredInvitations;
      const newContent = `export const DB = ${JSON.stringify(DB)}`;
      updateDB(newContent);
    }
    return res.sendStatus(202);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export const invitationsController = {
  sendInvitations,
  deleteInvitation,
};
