import { Router } from 'express';
import { checkAuth } from '../checkAuth.js';
import { authController } from '../controllers/authController.js';

export const authRouter = Router();

authRouter.post('/signin', authController.signIn);

authRouter.delete('/signout', checkAuth, authController.signOut);

authRouter.put('/refresh', checkAuth, authController.refreshToken);
