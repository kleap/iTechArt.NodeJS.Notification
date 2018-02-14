import { handleActions, combineActions } from 'redux-actions';
import actions from './../actions/creator';

const reducer = handleActions({
  [combineActions(
    actions.registration.request,
    actions.login.request,
  )](state, action) {
    return {
      ...state,
      ...action.payload,
      loading: true,
      errors: {},
    };
  },
  [combineActions(
    actions.registration.requestSuccess,
    actions.login.requestSuccess,
  )](state, action) {
    return {
      ...state,
      ...action.payload,
      loading: false,
      errors: {},
    };
  },
  [combineActions(
    actions.registration.requestFail,
    actions.login.requestFail,
    actions.logout.requestSuccess,
  )](state, action) {
    return {
      ...state,
      ...action.payload,
      loading: false,
      token: null,
    };
  },
  [actions.checkToken](state, action) {
    return {
      ...state,
      ...action.payload,
    };
  },
}, {
  isAuth: false,
  loading: false,
  errors: {},
});

export default reducer;
