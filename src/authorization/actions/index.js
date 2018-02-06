import { createActions } from 'redux-actions';
import { push } from 'react-router-redux';
import jwtDecode from 'jwt-decode';

export const actionsCreator = createActions({
  REGISTRATION: {
    REQUEST: user => ({ user }),
    REQUEST_SUCCESS: ({ token }) => ({ token }),
    REQUEST_FAIL: ({ errors }) => ({ errors }),
  },
  LOGIN: {
    REQUEST: user => ({ user }),
    REQUEST_SUCCESS: ({ token }) => ({ token }),
    REQUEST_FAIL: ({ errors }) => ({ errors }),
  },
  LOGOUT: {
    REQUEST: user => ({ user }),
    REQUEST_SUCCESS: ({ token }) => ({ token }),
    REQUEST_FAIL: ({ errors }) => ({ errors }),
  },
  CHECK_TOKEN: token => ({ token }),
});

export const register = user => (dispatch, getState, api) => {
  dispatch(actionsCreator.registration.request(user));
  return api.userRegistrationRequest(user)
    .then((response) => {
      if (response.success) {
        dispatch(actionsCreator.registration.requestSuccess(response));
        localStorage.setItem('token', response.token);
        return push('/dashboard');
      }
      return dispatch(actionsCreator.registration.requestFail(response));
    });
};

export const login = user => (dispatch, getState, api) => {
  dispatch(actionsCreator.login.request(user));
  return api.userLoginRequest(user)
    .then((response) => {
      if (response.success) {
        dispatch(actionsCreator.login.requestSuccess(response));
        localStorage.setItem('token', response.token);
        return push('/dashboard');
      }
      return dispatch(actionsCreator.login.requestFail(response));
    });
};

export const logout = () => (dispatch, getState, api) => {
  const { user: { token } } = getState();
  const user = jwtDecode(token);
  dispatch(actionsCreator.logout.request(user._doc));
  return api.userLogoutRequest(user)
    .then((response) => {
      if (response.success) {
        dispatch(actionsCreator.logout.requestSuccess(response));
        localStorage.removeItem('token');
        return push('/login');
      }
      return dispatch(actionsCreator.logout.requestFail(response));
    });
};

export const getToken = () => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(actionsCreator.checkToken(token));
};
