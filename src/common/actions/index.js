import { createActions } from 'redux-actions';

export const actions = createActions({
  CLOSE_NOTIFICATION: error => error,
  SHOW_NOTIFICATION: notification => ({ notification }),
});

export const closeNotification = () => (dispatch) => {
  dispatch(actions.closeNotification());
};
