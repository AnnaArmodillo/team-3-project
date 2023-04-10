/* eslint-disable class-methods-use-this */
class TeamProjectApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  getAuthorizationHeader(token) {
    return `Bearer ${token}`;
  }

  checkToken(token) {
    if (!token) throw new Error('Отсутствует токен');
  }

  async addNewUser(values) {
    const res = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (res.status === 409) {
      return res.json();
    }

    if (res.status === 400) {
      throw new Error('Не пройдена валидация');
    }
    if (res.status >= 401) {
      throw new Error(`Ошибка, код ${res.status}`);
    }

    return res.json();
  }

  async getAllUsers(token) {
    this.checkToken(token);
    const res = await fetch(`${this.baseUrl}/users`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-type': 'application/json',
      },
    });

    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при получении списка пользователей. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при получении списка пользователей. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res.json();
  }

  async getUserByEmail(search, token) {
    this.checkToken(token);
    const res = await fetch(`${this.baseUrl}/users/search/${search}`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-type': 'application/json',
      },
    });

    if (res.status === 404) {
      throw new Error(
        // eslint-disable-next-line max-len
        'Пользователь с таким email не найден. Вы можете пригласить его пройти опрос по прямой ссылке',
      );
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при получении списка пользователей. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res.json();
  }

  async getUserById(userId) {
    const res = await fetch(`${this.baseUrl}/users/${userId}`, {
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (res.status === 404) {
      throw new Error('Пользователь не найден');
    }

    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при получении пользователя. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при получении пользователя. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res.json();
  }

  async signIn(values) {
    const res = await fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (res.status === 401) {
      throw new Error('Неверные логин или пароль');
    }
    if (res.status >= 400) {
      throw new Error(`Ошибка, код ${res.status}`);
    }

    return res.json();
  }

  async signOut(token) {
    this.checkToken(token);

    const res = await fetch(`${this.baseUrl}/signout`, {
      method: 'DELETE',
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 401) {
      throw new Error('Необходимо авторизоваться');
    }
    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при выходе из приложения. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при выходе из приложения. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res;
  }

  async refreshToken(values, token) {
    this.checkToken(token);

    const res = await fetch(`${this.baseUrl}/refresh`, {
      method: 'PUT',
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (res.status === 401) {
      throw new Error('Необходимо авторизоваться');
    }
    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при обновлении токена. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при обновлении токена. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }
    return res.json();
  }

  async addNewSurvey(values, token) {
    this.checkToken(token);
    const res = await fetch(`${this.baseUrl}/surveys`, {
      method: 'POST',
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (res.status === 401) {
      throw new Error('Необходимо авторизоваться');
    }
    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при добавлении опроса. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при добавлении опроса. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res.json();
  }

  async getSurveyById(surveyId, token) {
    this.checkToken(token);

    const res = await fetch(`${this.baseUrl}/surveys/${surveyId}`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 401) {
      throw new Error('Необходимо авторизоваться');
    }
    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при просмотре опроса. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при просмотре опроса. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res.json();
  }

  async takeSurveyById(surveyId, values, token) {
    this.checkToken(token);

    const res = await fetch(`${this.baseUrl}/surveys/${surveyId}`, {
      method: 'PUT',
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (res.status === 401) {
      throw new Error('Необходимо авторизоваться');
    }
    if (res.status === 409) {
      throw new Error('Вы уже проголосовали в этом опросе');
    }
    if (res.status === 404) {
      throw new Error(
        'Такого варианта ответа не существует или опрос не найден',
      );
    }
    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при голосовании. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при голосовании. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res.json();
  }

  async getVisitedSurveys(token) {
    this.checkToken(token);

    const res = await fetch(`${this.baseUrl}/surveysfilters`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 401) {
      throw new Error('Необходимо авторизоваться');
    }
    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при получении списка. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при получении списка. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res.json();
  }

  async getSurveysByAuthor(author, token) {
    this.checkToken(token);

    const res = await fetch(`${this.baseUrl}/surveysfilters/${author}`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 401) {
      throw new Error('Необходимо авторизоваться');
    }
    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при получении списка. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при получении списка. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res.json();
  }

  async searchSurveys(search) {
    const res = await fetch(`${this.baseUrl}/opensearch?title=${search}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при получении списка опросов. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res.json();
  }

  async deleteSurveyFromVisited(surveyId, token) {
    this.checkToken(token);

    const res = await fetch(`${this.baseUrl}/surveys/${surveyId}`, {
      method: 'PATCH',
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 404) {
      throw new Error('Опрос не найден');
    }
    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res;
  }

  async uploadFile(formData, token) {
    this.checkToken(token);
    const res = await fetch(`${this.baseUrl}/upload`, {
      method: 'POST',
      headers: {
        authorization: this.getAuthorizationHeader(token),
      },
      body: formData,
    });
    if (res.status === 400) {
      throw new Error(
        'Не выбран файл для загрузки, либо его тип не соответствует типу изображения',
      );
    }
    if (res.status === 401) {
      throw new Error('Необходимо авторизоваться');
    }
    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при загрузке изображения. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при загрузке изображения. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res.json();
  }

  async getUploadedFile(filename, token) {
    this.checkToken(token);
    const res = await fetch(`${this.baseUrl}/upload/${filename}`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
      },
    });
    if (res.status === 401) {
      throw new Error('Необходимо авторизоваться');
    }
    if (res.status === 404) {
      throw new Error('Файл с таким именем не найден');
    }
    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при получении изображения. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при получении изображения. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }
    return res;
  }

  async sendInvitations(values, token) {
    this.checkToken(token);
    const res = await fetch(`${this.baseUrl}/invitations`, {
      method: 'PUT',
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (res.status === 401) {
      throw new Error('Необходимо авторизоваться');
    }
    if (res.status === 404) {
      throw new Error('Пользователь с таким email не найден');
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при отправке приглашений. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res;
  }

  async getAllSurveys() {
    const res = await fetch(`${this.baseUrl}/surveys/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 500) {
      throw new Error('Произошла внутренняя ошибка сервера. Не удалось получить данные опросов');
    }
    return res.json();
  }

  async deleteUserById(userID, token) {
    this.checkToken(token);
    const res = await fetch(`${this.baseUrl}/users/${userID}`, {
      method: 'DELETE',
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 401) {
      throw new Error('Необходимо авторизоваться');
    }
    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при удалении пользователя. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при удалении пользователя. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }
    return res;
  }

  async editUserById(userID, token, values) {
    this.checkToken(token);
    const res = await fetch(`${this.baseUrl}/users/${userID}`, {
      method: 'PATCH',
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (res.status === 401) {
      throw new Error('Необходимо авторизоваться');
    }
    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при редактировании пользователя. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при редактировании пользователя. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }
    return res;
  }

  async deleteInvitation(values, token) {
    this.checkToken(token);
    const res = await fetch(`${this.baseUrl}/invitations`, {
      method: 'PATCH',
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (res.status === 401) {
      throw new Error('Необходимо авторизоваться');
    }
    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при удалении приглашения. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при удалении приглашения. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }
    return res;
  }
}

export const teamProjectApi = new TeamProjectApi({
  baseUrl: 'http://localhost:3005/api/v1',
});
