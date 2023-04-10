import * as fs from 'fs';
import { jwtCreator } from './jwtCreator.js';

export function updateDB(content) {
  fs.writeFile('./src/DB/db.js', content, () => {
    return;
  });
}

export function getUserIdFromToken(token) {
  const { id } = jwtCreator.checkToken(token);
  return id;
}

export function createTokens(currentUser) {
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
  return currentUser;
}