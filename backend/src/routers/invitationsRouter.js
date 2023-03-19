import { Router } from 'express';
import { checkAuth } from '../checkAuth.js';
import { invitationsController } from '../controllers/invitationsController.js';

export const invitationsRouter = Router();

invitationsRouter.post('/', checkAuth, invitationsController.sendInvitations);

