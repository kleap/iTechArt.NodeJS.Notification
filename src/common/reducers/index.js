import { handleActions } from 'redux-actions';
import { actions } from './../actions';

const reducer = handleActions({
  [actions.closeNotification](state) {
    return {
      ...state,
      notification: {},
    };
  },
  [actions.showNotification](state, action) {
    return {
      ...state,
      ...action.payload,
    };
  },
}, {
  notification: { message: '', header: '' },
});

export default reducer;
