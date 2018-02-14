import { createActions } from 'redux-actions';

export const actions = createActions({
  CLOSE_NOTIFICATION: id => (id),
  SHOW_NOTIFICATION: notification => notification,
});

export const closeNotification = id => (dispatch) => {
  dispatch(actions.closeNotification(id));
};
