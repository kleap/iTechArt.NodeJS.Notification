import { createActions } from 'redux-actions';
import { push } from 'react-router-redux';
import jwtDecode from 'jwt-decode';
import { actions as commonActions } from './../../common/actions';
import {
  userRegistrationRequest,
  userLoginRequest,
  userLogoutRequest,
} from './../api';

const errHandler = (dispatch, response) => {
  if (response.message) {
    dispatch(commonActions.showNotification({ ...response, type: 'error' }));
  }
};

const createActionFlow = (title, { apiCall, cb = () => { }, err = errHandler }) => ({
  [title.toUpperCase()]: {
    CALL: data => ({ prefix: title.toLowerCase(), apiCall: () => apiCall(data), cb, err }),
    REQUEST: () => ({}),
    REQUEST_SUCCESS: ({ token }) => ({ token }),
    REQUEST_FAIL: ({ errors }) => ({ errors }),
  },
});

export const actionsCreator = createActions({
  ...createActionFlow('registration', {
    apiCall: userRegistrationRequest,
    cb: (dispatch, response) => {
      localStorage.setItem('token', response.token);
      return push('/dashboard');
    },
  }),
  ...createActionFlow('login', {
    apiCall: userLoginRequest,
    cb: (dispatch, response) => {
      localStorage.setItem('token', response.token);
      return push('/dashboard');
    },
  }),
  ...createActionFlow('logout', {
    apiCall: userLogoutRequest,
    cb: (dispatch, response) => {
      localStorage.setItem('token', response.token);
      return push('/dashboard');
    },
  }),
});

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
      dispatch(commonActions.showNotification({ ...response, type: 'error' }));
      return dispatch(actionsCreator.logout.requestFail(response));
    });
};

export const getToken = () => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(actionsCreator.checkToken(token));
};
