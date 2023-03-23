# Проект Armodillo или ЦентрИзбирКом для вашей домашней демократии

Этот проект создавался на основе [React](https://github.com/facebook/create-react-app).

## Использованные технологии

1. Технологии frontend
  1. [Create React App.](https://github.com/facebook/create-react-app)
  2. [Classnames.](https://www.npmjs.com/package/classnames)
  3. [React Router.](https://reactrouter.com/en/main)
  4. [Formik.](https://formik.org/)
  5. [TanStack Query v4.](https://tanstack.com/query/latest)
  6. [Redux.](https://redux.js.org/)
  7. [Redux Toolkit.](https://redux-toolkit.js.org/)
  8. [Font Awesome.](https://fontawesome.com/)
  9. [SASS.]()https://www.npmjs.com/package/sass
  10. [React-Toastify.](https://fkhadra.github.io/react-toastify/introduction)
  11. [Yup.](https://www.npmjs.com/package/yup)
12. Технологии backend
  13. [Express.](https://expressjs.com/)
  14. [Express-fileupload.](https://www.npmjs.com/package/express-fileupload)
  15. [Cookie-parser.](https://www.npmjs.com/package/cookie-parser)
  16. [Bcrypt.](https://www.npmjs.com/package/bcrypt)
  17. [Morgan.](https://www.npmjs.com/package/morgan)
  18. [JSONWebToken.](https://www.npmjs.com/package/jsonwebtoken)
  19. [Cors.](https://www.npmjs.com/package/cors)

## Доступные скрипты

В директории проекта можно запустить:

### `npm start`
Запускает приложение в режиме разработки.\
Откройте [http://localhost:3000](http://localhost:3000) для просмотра в вашем браузере.
Страница перезапускается при внесении изменений в код.

## Backend
Во вложенной директории ```backend``` расположен сервер для проекта. Там можно выполнить команды ```npm start``` для запуска бэкенд сервера или ```npm run dev``` для запуска сервера через nodemon. 

## Основной функционал проекта

- Главная страница проекта. Ответственный исполнитель: [@KatlinBulycheva](https://github.com/KatlinBulycheva)
- Страница создания опроса. Ответственный исполнитель: [@AnnaArmodillo](https://github.com/AnnaArmodillo)
- Страница входа в приложение. Ответственный исполнитель: [@DYAlex](https://github.com/DYAlex)
- Страница регистрации в приложении. Ответственный исполнитель: [@DYAlex](https://github.com/DYAlex)
- Страница профиля. Ответственный исполнитель: [@lev33](https://github.com/lev33)
- Страница опросов, созданных текущим пользователем. Ответственный исполнитель: [@lev33](https://github.com/lev33)
- Страница опросов других авторов, которые посещал текущий пользователь.Ответственный исполнитель: [@KatlinBulycheva](https://github.com/KatlinBulycheva)
- Страница опроса, в котором можно выбрать только один вариант ответа, если его никто до этого не выбрал (примерно как забронировать определенное место, чтобы никто другой уже не мог на него сесть). Ответственный исполнитель: [@AnnaArmodillo](https://github.com/AnnaArmodillo)
- Страница опроса, в котором можно выбрать только один вариант ответа на вопрос. Ответственный исполнитель: [@DYAlex](https://github.com/DYAlex)
- Страница опроса, в котором можно выбрать несколько вариантов ответа на вопрос. Ответственный исполнитель: [@DYAlex](https://github.com/DYAlex)
- Страница контактов разработчиков. Ответственный исполнитель: [@KatlinBulycheva](https://github.com/KatlinBulycheva)
- Страница справки по работе в приложении. Ответственный исполнитель: [@KatlinBulycheva](https://github.com/KatlinBulycheva)
- Страница всех опросов, созданных всеми пользователями приложения. Ответственный исполнитель: [@DYAlex](https://github.com/DYAlex)
- Страница отправки другим пользователям приглашений пройти опрос, созданный текущим пользователем. Ответственный исполнитель: [@AnnaArmodillo](https://github.com/AnnaArmodillo)

## План развития проекта
- Возможность менять статус опроса на "Закрыт для голосования"
- Возможность удалять из базы данных опрос, созданный текущим пользователем
- Возможность редактировать профиль пользователя, в том числе менять имя пользователя, пароль, аватар
- Возможность создания у пользователей уникального логина
- Возможность приглашать других пользователей к участию в опросе по логину
- Возможность для автора опроса ограничивать доступ к опросу определенным кругом пользователей
- Привлечение в состав команды разработки дизайнера для улучшения визуальной составляющей проекта
- Привлечение в состав команды backend-разработчика для развития и поддержки бэкенда проекта

## Известные баги
-  [WONTFIX] При загрузке изображения на бэкенд сервере идет проверка только по mimetype, что может привести к потенциальным проблемам в плане безопасности. Разработка этого сервера не входит в задачи команды по фронтенду и потому работы по исправлению здесь вестись не будут. 
