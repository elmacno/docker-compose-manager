import Fetch from './Fetch';
import Cookies from 'js-cookies';

export default class AuthService {
  static isLoggedIn() {
    return !!Cookies.getItem('token');
  }

  static async logIn(username, password, remember) {
    let response = await Fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    if (!response.ok) {
      throw new Error(response.json());
    }
    let body = await response.json();
    const days = remember ? 7 : 1;
    Cookies.setItem('token', body.token, { expires: days });
    Cookies.setItem(
      'profile',
      { username: username, rights: body.rights },
      { expires: days }
    );
  }
}
