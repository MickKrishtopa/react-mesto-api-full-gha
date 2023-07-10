const { API_URL = 'http://localhost:4000' } = process.env;

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._authorization = headers.authorization;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._checkResponse(res));
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  setUserAvatar(link) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  setUserInfo(name, about) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  addNewCard(name, link) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  removeCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  toggleCardLike(cardId, isLiked) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: isLiked ? 'DELETE' : 'PUT',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}

const api = new Api({
  baseUrl: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
