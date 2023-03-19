import { Router } from 'express';
import { checkAuth } from '../checkAuth.js';
import { invitationsController } from '../controllers/invitationsController.js';
import { usersController } from '../controllers/usersController.js';

export const invitationsRouter = Router();

invitationsRouter.post('/', checkAuth, invitationsController.sendInvitations);

