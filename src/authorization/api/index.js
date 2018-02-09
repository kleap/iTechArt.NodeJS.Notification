import axios from 'axios';
import requestHandler from '../../common/api';

export function userRegistrationRequest(user) {
  return requestHandler(axios.post('http://localhost:8080/api/auth/register', user)).catch(err => console.log(err));
}

export function userLoginRequest(user) {
  return requestHandler(axios.post('http://localhost:8080/api/auth/login', user));
}

export function userLogoutRequest(user) {
  return requestHandler(axios.post('http://localhost:8080/api/auth/logout', user));
}
