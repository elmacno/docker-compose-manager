import Fetch from './Fetch';
import Cookies from 'js-cookies';

export default class AuthService {
  static isLoggedIn() {
    return !!Cookies.getItem('token');
  }

  static async logIn(username, password, remember) {
    let response;
    try {
      response = await Fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
      const days = remember ? 7 : 1;
      Cookies.setItem('token', JSON.stringify({ token: response.token }), {
        expires: days
      });
      Cookies.setItem(
        'profile',
        JSON.stringify({ username: username, rights: response.rights }),
        { expires: days }
      );
    } catch (error) {
      throw error;
    }
  }
}
