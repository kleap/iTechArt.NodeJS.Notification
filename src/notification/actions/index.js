import {
    NOTIFICATION_SAVE_REQUEST,
    NOTIFICATION_DELETE_REQUEST
} from './constants';

export const notificationSaveRequest = (notification) => ({
    type: NOTIFICATION_SAVE_REQUEST,
    notification
});

export const notificationDeleteRequest = (id) => ({
    type: NOTIFICATION_DELETE_REQUEST,
    id
});