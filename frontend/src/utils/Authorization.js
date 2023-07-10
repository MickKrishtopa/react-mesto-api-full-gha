
const { API_URL = 'http://localhost:4000' } = process.env;



class Authorization {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res);
  }

  registration(email, password) {

    console.log('АПИ из окружения', API_URL);
    console.log('Запрос на этот УРЛ', this._baseUrl + '/signup');

    return fetch(this._baseUrl + '/signup', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this._checkResponse(res));
  }

  login(email, password) {

    console.log('АПИ из окружения', API_URL);
    console.log('Запрос на этот УРЛ', this._baseUrl + '/signin');

    return fetch(this._baseUrl + '/signin', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this._checkResponse(res));
  }

  checkToken(token) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then((res) => this._checkResponse(res));
  }
}

const authorization = new Authorization(API_URL);
export default authorization;
