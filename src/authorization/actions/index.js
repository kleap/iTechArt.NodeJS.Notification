import jwtDecode from 'jwt-decode';
import actions from './creator';

export const login = actions.login.call;
export const register = actions.registration.call;

export const logout = () => (dispatch, getState) => {
  const { user: { token } } = getState();
  const user = jwtDecode(token);
  dispatch(actions.logout.call(user._doc));
};

export const checkToken = () => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(actions.checkToken(token));
};
