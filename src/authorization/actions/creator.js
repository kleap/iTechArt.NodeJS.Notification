import { createActions } from 'redux-actions';
import { push } from 'react-router-redux';
import { actions as commonActions } from './../../common/actions';
import { userRegistrationRequest, userLoginRequest, userLogoutRequest } from './../api';

const errHandler = (dispatch, response) => {
  if (response.message) {
    dispatch(commonActions.showNotification({ ...response, type: 'error', id: Date.now().toString() }));
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

export default createActions({
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
    cb: () => {
      localStorage.removeItem('token');
      return push('/login');
    },
  }),
  CHECK_TOKEN: token => ({ token }),
});

