
export const notificationFetchRequest = () => ({ type: NOTIFICATION_FETCH_REQUEST });
export const notificationGetRequest = id => ({ type: NOTIFICATION_GET_REQUEST, id });

export const toggleNotification = id => ({ type: NOTIFICATION_TOGGLE_REQUEST, id });
