import { createActions } from 'redux-actions';

export const actions = createActions({
  GET: {
    REQUEST: notification => ({ notification }),
    REQUEST_SUCCESS: ({ notification }) => ({ notification }),
    REQUEST_FAIL: ({ notification }) => ({ notification }),
  },
  SAVE: {
    REQUEST: notification => ({ notification }),
    REQUEST_SUCCESS: ({ notification }) => ({ notification }),
    REQUEST_FAIL: ({ notification }) => ({ notification }),
  },
  DELETE: {
    REQUEST: notification => ({ notification }),
    REQUEST_SUCCESS: ({ notification }) => ({ notification }),
    REQUEST_FAIL: ({ notification }) => ({ notification }),
  },
});

export const saveNotification = notification => (dispatch, getState, { notificationApi }) => {
  dispatch(actions.get.request(notification));
  return notificationApi.saveNotification(notification)
    .then((response) => {
      if (response.success) {
        dispatch(actions.get.requestSuccess(response));
      }
      return dispatch(actions.get.requestFail(response));
    });
};
