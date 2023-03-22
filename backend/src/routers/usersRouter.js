import { Router } from 'express';
import { checkAuth } from '../checkAuth.js';
import { usersController } from '../controllers/usersController.js';

export const usersRouter = Router();

usersRouter.get('/', checkAuth, usersController.getAllUsers);
usersRouter.get('/:userID', usersController.getUserByID);
usersRouter.post('/', usersController.addNewUser);
usersRouter.get('/search/:userEmail', checkAuth, usersController.searchUserByEmail);
usersRouter.delete('/:userID', checkAuth, usersController.deleteUserByID);
