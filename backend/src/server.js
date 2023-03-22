import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { checkAuth } from './checkAuth.js';
import { usersRouter } from './routers/usersRouter.js';
import { authRouter } from './routers/authRouter.js';
import { surveysRouter } from './routers/surveysRouter.js';
import { surveysFilterRouter } from './routers/surveysFilterRouter.js';
import { uploadImagesRouter } from './routers/uploadImagesRouter.js';
import fileUpload from 'express-fileupload'
import { invitationsRouter } from './routers/invitationsRouter.js';
import { surveysOpenSearchRouter } from './routers/surveysOpenSearchRouter.js';

const PORT = 3005;

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(fileUpload({
  limits: {
      fileSize: 10000000, // Ограничение на загрузку примерно 10MB
  },
  abortOnLimit: true,
}))
// Это роут для раздачи статического файла из папки public, в котором лежит форма для проверки загрузки файла. Раскомментировать для тестирования.
// app.use(express.static('public'));
app.use('/api/v1/users', usersRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1/surveys', surveysRouter);
app.use('/api/v1/surveysfilters', surveysFilterRouter);
app.use('/api/v1/opensearch', surveysOpenSearchRouter)
// Это роут для загрузки файлов картинок в папку uploads
app.use('/api/v1/upload', uploadImagesRouter);
app.use('/api/v1/invitations', invitationsRouter);
//для перехода на защищенную страницу
app.get('/api/v1/secret', checkAuth, (req, res) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log('server is running');
});
