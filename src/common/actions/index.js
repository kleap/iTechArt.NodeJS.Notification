import { createActions } from 'redux-actions';

export const actions = createActions({
  CLOSE_NOTIFICATION: () => { },
  SHOW_NOTIFICATION: notification => ({ notification }),
});

export const closeNotification = () => (dispatch) => {
  dispatch(actions.closeNotification());
};
