import { handleActions, combineActions } from 'redux-actions';
import { actionsCreator } from './../actions';

const reducer = handleActions({
  [combineActions(
    actionsCreator.registration.requestSuccess,
    actionsCreator.login.requestSuccess,
  )](state, action) {
    return {
      ...state,
      ...action.payload,
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
  isAuth: null,
  errors: { },
});

export default reducer;
