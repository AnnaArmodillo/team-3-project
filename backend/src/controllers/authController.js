import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { DB } from '../DB/db.js';
import { jwtCreator } from '../jwtCreator.js';
import { updateDB } from '../helper.js';

dotenv.config();

async function signIn(req, res) {
  const { email, password } = req.body;
  const currentUser = DB.users.find((user) => user.email === email);
  if (currentUser) {
    if (await bcrypt.compare(password, currentUser.password)) {
      const accessToken = jwtCreator.createAccessToken({
        email: currentUser.email,
        id: currentUser.id,
      });
      const refreshToken = jwtCreator.createRefreshToken({
        email: currentUser.email,
        id: currentUser.id,
      });
      currentUser.accessToken = accessToken;
      currentUser.refreshToken = refreshToken;
      const { password, ...noPasswordUser } = currentUser;
      const newContent = `export const DB = ${JSON.stringify(DB)}`;
      updateDB(newContent);
      return res.status(200).json(noPasswordUser);
    }
  }
  return res.status(401).json('Неверный email или пароль');
}

function signOut(req, res) {
  try {
    const currentUser = DB.users.find((user) => user.id === req.userId);
    currentUser.refreshToken = '';
    currentUser.accessToken = '';
    const newContent = `export const DB = ${JSON.stringify(DB)}`;
    updateDB(newContent);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function refreshToken(req, res) {
  try {
    // в jwtCreator.refresh здесь легче передавать req.body, чтобы корректно получить в нем данные для валидации. Из-за того, что здесь передавался весь запрос, в refresh получался currentUser - undefined
    return res.json(await jwtCreator.refresh(req.body));
  } catch (error) {
    if (error.message === '401') return res.sendStatus(401);
    return res.sendStatus(500);
  }
}

export const authController = {
  signIn,
  signOut,
  refreshToken,
};
