import { NOTIFICATION_FETCH_REQUEST, NOTIFICATION_TOGGLE_REQUEST } from './constants';
import { NOTIFICATION_GET_REQUEST } from './../../notification/actions/constants';

export const notificationFetchRequest = () => ({ type: NOTIFICATION_FETCH_REQUEST });
export const notificationGetRequest = (id) => ({ type: NOTIFICATION_GET_REQUEST, id });

export const toggleNotification = (id) => ({ type: NOTIFICATION_TOGGLE_REQUEST, id });
