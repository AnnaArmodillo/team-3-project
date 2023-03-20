import { jwtCreator } from './jwtCreator.js';

export const checkAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json('Необходимо авторизоваться');
  }
  const token = req.headers.authorization.split(' ')[1];
  try {
    const { id } = jwtCreator.checkToken(token);
    req.userId = id;
    req.userToken = token;
  } catch (error) {
    return res.status(401).json('Необходимо авторизоваться');
  }
  return next();
};
