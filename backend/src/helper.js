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
