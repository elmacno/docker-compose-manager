import fetch from 'unfetch';
import Cookies from 'js-cookies';

const Fetch = async (url, options) => {
  // Make all request in JSON format
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  let token = Cookies.getItem('token');
  // Add authorization header if a valid token is available
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }

  let response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    throw new Error(response.json());
  }
  return response.json();
};

export default Fetch;
