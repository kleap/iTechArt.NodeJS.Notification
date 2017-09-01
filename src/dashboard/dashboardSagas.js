import {
    NOTIFICATION_FETCH_REQUEST,
    NOTIFICATION_FETCH_REQUEST_SUCCESS,
    NOTIFICATION_TOGGLE_REQUEST,
    NOTIFICATION_TOGGLE_REQUEST_SUCCESS
} from './actions/constants';
import {
    NOTIFICATION_GET_REQUEST,
    NOTIFICATION_GET_REQUEST_SUCCESS
} from './../notification/actions/constants';

import { fetchNotifications, getNotification, toggleNotification } from './services/api';

import { push } from 'react-router-redux';
import { take, call, put, all, fork } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';

export function* fetchNotificationFlow() {
    while (true) {
        const { notification } = yield take(NOTIFICATION_FETCH_REQUEST);
        const userId = jwtDecode(localStorage.getItem('token'))._doc._id;
        const response = yield call(fetchNotifications, userId);
        if (response.success) {
            yield put({ type: NOTIFICATION_FETCH_REQUEST_SUCCESS, data: response.data });
        }
    }
}
export function* getNotificationFlow() {
    while (true) {
        const { id } = yield take(NOTIFICATION_GET_REQUEST);
        const response = yield call(getNotification, id);
        if (response.success) {
            yield put({ type: NOTIFICATION_GET_REQUEST_SUCCESS, data: response.data });
            yield put(push('/notification'));
        }
    }
}
export function* toggleNotificationFlow() {
    while (true) {
        const { id } = yield take(NOTIFICATION_TOGGLE_REQUEST);
        const response = yield call(toggleNotification, id);
        if (response.success) {
            yield put({ type: NOTIFICATION_TOGGLE_REQUEST_SUCCESS, data: response.data });

        } else {
            yield put({ type: CONNECTION_ERROR });
        }

    }
}
