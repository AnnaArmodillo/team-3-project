import { Router } from 'express';
import { uploadImagesController } from '../controllers/uploadImagesController.js';

export const uploadImagesRouter = Router();

uploadImagesRouter.post(
  '/', uploadImagesController.uploadFile
);
uploadImagesRouter.get(
  '/:filename', uploadImagesController.getUploadedFile
);
