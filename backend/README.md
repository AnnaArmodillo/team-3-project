# Сервер проекта Armodillo

Этот сервер создавался на основе [Express JS](https://expressjs.com/).

## Инструкция для пользователя
1. После скачивания выполнить команду ```npm i```

2. Создать файл ```.env``` на корневом уровне сервера (папка `backend`) и добавить в нее переменные `JWT_SECRET` - секретная строка, которая будет использоваться для генерации токенов, `JWT_ACCESS_TOKEN_LIFETIME_IN_SECONDS` - срок жизни токена доступа, `JWT_REFRESH_TOKEN_LIFETIME_IN_SECONDS` - срок жизни токена обновления (всегда больше срока жизни токена доступа), `BCRYPT_SALT_ROUND` - количество прогонов соли при хэшировании паролей.

3. Выполнить команду ```npm start``` для запуска сервера или команду ```npm run dev``` для запуска сервера через nodemon.

Сервер запустится на [http://localhost:3005](http://localhost:3005/)

## Использованные технологии
1. [Express.](https://expressjs.com/)
2. [Express-fileupload.](https://www.npmjs.com/package/express-fileupload)
3. [Cookie-parser.](https://www.npmjs.com/package/cookie-parser)
4. [Bcrypt.](https://www.npmjs.com/package/bcrypt)
5. [Morgan.](https://www.npmjs.com/package/morgan)
6. [JSONWebToken.](https://www.npmjs.com/package/jsonwebtoken)
7. [Cors.](https://www.npmjs.com/package/cors)

## Доступные скрипты

В директории проекта можно запустить:

### `npm start`
Сервер запускается на [http://localhost:3005](http://localhost:3005)
### `npm run dev` 
Запускает приложение в режиме разработки. Запускает сервер через nodemon. 

## Список оконечных точек API
### Точки пользователя
<table>
    <thead>
        <th>Действие</th>
        <th>Метод</th>
        <th>URL</th>
        <th>Что принимает</th>
        <th>Коды ответов</th>
    </thead>
    <tbody>
        <tr>
            <td>Добавление нового пользователя</td>
            <td>POST</td>
            <td>http://localhost:3005/api/v1/users</td>
            <td>Email, <br />
                Name, <br />
                password</td>
            <td>409 (уже есть такой емэйл),<br />
                400 (не пройдена валидация на бэке),<br />
                500 (внутренняя ошибка сервера),<br />
                201 (присылает добавленного юзера)</td>
        </tr>
        <tr>
            <td>Просмотр всех юзеров</td>
            <td>GET</td>
            <td>http://localhost:3005/api/v1/users</td>
            <td></td>
            <td>500 (внутренняя ошибка сервера), <br />
                200 (присылает массив юзеров)</td>
        </tr>	
        <tr>
            <td>Просмотр юзера по id</td>
            <td>GET</td>
            <td>http://localhost:3005/api/v1/users/:userId</td>
            <td></td>
            <td>404 (не найден такой юзер), <br />
                500 (внутренняя ошибка сервера), <br />
                200 (присылает данные юзера)</td>
        </tr>
        <tr>
            <td>Поиск юзера по email</td>
            <td>GET</td>
            <td>http://localhost:3005/api/v1/users/:userId <br /> getUserById(userId)</td>
            <td>userId</td>
            <td>404 (не найден такой юзер),<br />
                500 (внутренняя ошибка сервера),<br />
                200 (присылает данные юзера)</td>
        </tr>
        <tr>
            <td>Удаление юзера</td>
            <td>DELETE</td>
            <td>http://localhost:3005/api/v1/users/:userId <br />
                deleteUserById(userId, token)</td>
            <td>userId, accessToken</td>
            <td>202 (принято), <br /> 401 (неверный емэйл или пароль), <br /> 403 (запрещено, нельзя удалить чужой аккаунт),<br /> 
                500 (внутренняя ошибка сервера)</td>
        </tr>
        <tr>
            <td>Авторизация</td>
            <td>POST</td>
            <td>http://localhost:3005/api/v1/signin</td>
            <td>Email, <br />
                password</td>
            <td>401 (неверный емэйл или пароль), <br />
                200 (принято, присылает данные юзера и access и refresh токены)</td>
        </tr>
        <tr>
            <td>Выход из системы</td>
            <td>DELETE</td>
            <td>http://localhost:3005/api/v1/signout</td>
            <td></td>
            <td>401 (необходимо авторизоваться), <br />
                200 (ок), <br />
                500 (внутренняя ошибка сервера)</td>
        </tr>
        <tr>
            <td>Обновление токенов</td>
            <td>PUT</td>
            <td>http://localhost:3005/api/v1/refresh</td>
            <td>userId, <br />
                refreshToken</td>
            <td>401 (необходимо авторизоваться),<br />
                500 (внутренняя ошибка сервера),<br />
                200 (ок, присылает новые токены access и refresh)</td>
        </tr>
    </tbody>
</table>

### Точки опросов
<table>
    <thead>
      <th>Действие</th>
      <th>Метод</th>
      <th>URL</th>
      <th>Что принимает</th>
      <th>Коды ответов</th>
    </thead>
    <tbody>
      <tr>
        <td>Добавление нового опроса</td>
        <td>POST</td>
        <td>http://localhost:3005/api/v1/surveys</td>
        <td>accessToken, <br />
          surveyTitle,<br />
          surveyType,<br />
          options – массив из объектов {optionTitle, image, url}</td>
        <td>201 (принято, присылает объект опроса),<br />
          401 (необходима авторизация),<br />
           500 (внутренняя ошибка сервера)</td>
      </tr>
      <tr>
        <td>Просмотр опроса по id (при первом посещении опроса userId автоматом записывается в свойство visited опроса)</td>
        <td>GET</td>
        <td>http://localhost:3005/api/v1/surveys/:surveyId</td>
        <td>accessToken</td>
        <td>200 (принято, присылает объект опроса),<br />
          401 (необходима авторизация),<br />
           500 (внутренняя ошибка сервера)</td>
      </tr>
      <tr>
        <td>Удаление опроса из списка посещенных</td>
        <td>PATCH</td>
        <td>http://localhost:3005/api/v1/surveys/:surveyId<br />
          deleteSurveyFromVisited(surveyId, token)</td>
        <td>surveyId, accessToken</td>
        <td>200 (ок),<br /> 404 (опрос не найден),<br /> 500 (внутренняя ошибка сервера)</td>
      </tr>
      <tr>
        <td>Просмотр посещенных опросов (бэк фильтрует по свойству visited и присылает на фронт уже отсортированный массив)</td>
        <td>GET</td>
        <td>http://localhost:3005/api/v1/surveysfilters</td>
        <td>accessToken</td>
        <td>200 (ок, присылает массив опросов),<br />
          401 (необходимо авторизоваться),<br />
          500 (внутренняя ошибка сервера)</td>
      </tr>
      <tr>
        <td>Голосование в опросе (бэк автоматом добавляет в свойство done опроса userid, чтобы пометить опрос как пройденный, ответы этого юзера в нем больше не принимаются)</td>
        <td>PUT</td>
        <td>http://localhost:3005/api/v1/surveys/:surveyId</td>
        <td>Строка с optionId чекнутого варианта ответа или массив строк, accessToken</td>
        <td>404 (Опрос не найден), <br />
          404 (Такой вариант ответа не существует),<br />
          409 (Вы уже проголосовали в этом опросе),<br />
          201 (принято, присылает обновленный опрос),<br />
          500 (внутренняя ошибка сервера)</td>
      </tr>
      <tr>
        <td>Просмотр всех опросов, автором которых является пользователь</td>
        <td>GET</td>
        <td>http://localhost:3005/api/v1/surveysfilters/:author	</td>
        <td>accessToken</td>
        <td>200 (ок, присылает массив опросов), <br />
          500 (внутренняя ошибка сервера)</td>
      </tr>
      <tr>
        <td>Просмотр всех опросов</td>
        <td>GET</td>
        <td>http://localhost:3005/api/v1/surveys<br />
          getAllSurveys ()</td>
        <td>title (в строке url)</td>
        <td>200 (ок, присылает массив опросов), <br />
          500 (внутренняя ошибка сервера)</td>
      </tr>
      <tr>
        <td>Поиск по имени опроса</td>
        <td>GET</td>
        <td>http://localhost:3005/api/v1/opensearch?title=${search}<br />
          searchSurveys(search)</td>
        <td></td>
        <td>200 (ок, присылает массив опросов), 
          500 (внутренняя ошибка сервера)</td>
      </tr>
    </tbody>
  </table>

### Точки изображений
<table>
    <thead>
      <th>Действие</th>
      <th>Метод</th>
      <th>URL</th>
      <th>Что принимает</th>
      <th>Коды ответов</th>
    </thead>
    <tbody>
      <tr>
        <td>Загрузка изображения на сервер</td>
        <td>POST</td>
        <td>http://localhost:3005/api/v1/upload<br />
          uploadFile(formData, token)</td>
        <td>image</td>
        <td>201 (ок, присылает имя загруженного файла на сервере), <br />400 (файл для загрузки не был выбран), <br />400(тип файла не соответствует типу изображений),<br /> 500 (внутренняя ошибка сервера)</td>
      </tr>
      <tr>
        <td>Получение изображения с сервера</td>
        <td>GET</td>
        <td>http://localhost:3005/api/v1/upload/:filename<br />
          getUploadedFile(filename, token)</td>
        <td>Filename, accessToken</td>
        <td>200 (ок, присылает файл), <br />404 (файл с таким именем не найден), <br />500 (внутренняя ошибка сервера)</td>
      </tr>
    </tbody>
  </table>

### Точки приглашений
<table>
    <thead>
      <th>Действие</th>
      <th>Метод</th>
      <th>URL</th>
      <th>Что принимает</th>
      <th>Коды ответов</th>
    </thead>
    <tbody>
      <tr>
        <td>Отправка юзерам приглашений к опросу</td>
        <td>PUT</td>
        <td>http://localhost:3005/api/v1/invitations<br />
          sendInvitations(values, token)</td>
        <td>surveyId, массив из email юзеров, accessToken</td>
        <td>201 (ок, массивы юзеров, которым приглашения отправлены успешно, юзеров, которые не найдены в базе данных, юзеров, которые уже были приглашены этим юзером к этому опросу), <br />500 (внутренняя ошибка сервера)</td>
      </tr>
      <tr>
        <td>Удаление приглашения к опросу</td>
        <td>PATCH</td>
        <td>http://localhost:3005/api/v1/invitations<br />
          deleteInvitation(values, token)</td>
        <td>fromUser, survey, accessToken</td>
        <td>202 (принято), <br />500 (внутренняя ошибка сервера)</td>
      </tr>
    </tbody>
  </table>

## План изменений на сервере в связи с развитием проекта
- Возможность менять статус опроса на "Закрыт для голосования"
- Возможность удалять из базы данных опрос, созданный текущим пользователем
- Возможность редактировать профиль пользователя, в том числе менять имя пользователя, пароль, аватар
- Возможность создания у пользователей уникального логина
- Возможность приглашать других пользователей к участию в опросе по логину
- Возможность для автора опроса ограничивать доступ к опросу определенным кругом пользователей

## Известные баги
-  [WONTFIX] При загрузке изображения на бэкенд сервере идет проверка только по mimetype, что может привести к потенциальным проблемам в плане безопасности. Разработка этого сервера не входит в задачи команды по фронтенду и потому работы по исправлению здесь вестись не будут. 
-  [WONTFIX] Просмотр всех опросов в базе происходит без авторизации, что может привести к утечке данных. Разработка этого сервера не входит в задачи команды по фронтенду и потому работы по исправлению здесь вестись не будут. 
