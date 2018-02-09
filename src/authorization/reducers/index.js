import { handleActions, combineActions } from 'redux-actions';
import { actionsCreator } from './../actions';

const reducer = handleActions({
  [combineActions(
    actionsCreator.registration.request,
    actionsCreator.login.request,
  )](state, action) {
    return {
      ...state,
      ...action.payload,
      loading: true,
      errors: {},
    };
  },
  [combineActions(
    actionsCreator.registration.requestSuccess,
    actionsCreator.login.requestSuccess,
  )](state, action) {
    return {
      ...state,
      ...action.payload,
      loading: false,
      errors: {},
    };
  },
  [combineActions(
    actionsCreator.registration.requestFail,
    actionsCreator.login.requestFail,
    actionsCreator.logout.requestSuccess,
  )](state, action) {
    return {
      ...state,
      ...action.payload,
      loading: false,
      token: null,
    };
  },
  [actionsCreator.checkToken](state, action) {
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
