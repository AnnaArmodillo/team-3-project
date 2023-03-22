import { getMd5ImageName } from '../helpers/utils.js';
import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadFolderPath = __dirname.slice(0, (__dirname.indexOf('src') - 1)) + '/uploads/'

async function uploadFile(req, res) {
  try {
    try {
        // Получаем файл, который был отправлен в наше поле "image"
        const { image } = req.files;
        // Если mimetype файла не соответствует image, то прерываем загрузку
        if (!/^image/.test(image.mimetype)) {
          console.log('Mimetype problem');
          return res.sendStatus(400);
        }
        const md5ImageName = getMd5ImageName(image)
        try {
          // Перемещаем загруженный файл в нашу папку upload под новым именем, соответствующим его md5 подписи, но с прежним расширением
          image.mv(uploadFolderPath + md5ImageName);
          // Все прошло успешно высылаем новое имя файла
        res.status(201).send(JSON.stringify(md5ImageName));
      } catch (error) {
        // Если картинки не предоставлено, то выходим
        console.log('Could not upload image', error);
        res.sendStatus(500);
      }
    } catch (error) {
      console.log('No image found in upload data');
      return res.status(400).json('Не выбран файл для загрузки');
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function getUploadedFile(req, res) {
  try {
    const filename = req.params.filename;
    try {
      res.sendFile(path.resolve(uploadFolderPath, filename));
    } catch (error) {
      return res.status(404).json('Файл с таким именем не найден')
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}

export const uploadImagesController = {
  uploadFile,
  getUploadedFile,
};
