import {
    USER_REGISTRATION_REQUEST,
    USER_REGISTRATION_REQUEST_FAIL,
    USER_REGISTRATION_REQUEST_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_REQUEST_SUCCESS,
    USER_LOGIN_REQUEST_FAIL,
    USER_LOGOUT
} from './authorization/actions/constants';

import {NOTIFICATION_SAVE_REQUEST, NOTIFICATION_GET_REQUEST_SUCCESS, NOTIFICATION_DELETE_REQUEST, NOTIFICATION_DELETE_REQUEST_SUCCESS} from './notification/actions/constants';
import {NOTIFICATION_FETCH_REQUEST, NOTIFICATION_FETCH_REQUEST_SUCCESS, NOTIFICATION_GET_REQUEST, NOTIFICATION_TOGGLE_REQUEST, NOTIFICATION_TOGGLE_REQUEST_SUCCESS} from './dashboard/actions/constants';

import {userRegistrationRequest, userLoginRequest} from './authorization/services/api';
import {notificationSaveRequest, notificationDeleteRequest} from './notification/services/api';
import {fetchNotifications, getNotification, toggleNotification} from './dashboard/services/api';

import {push} from 'react-router-redux';
import {take, call, put, all, fork} from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';

function * authorize(user) {
    try {
        const {token} = yield call(userLoginRequest, user);
        localStorage.setItem('token', token);
        yield put({type: USER_LOGIN_REQUEST_SUCCESS, isAuth: true});
        yield put(push('/dashboard'));
        return token;
    } catch (error) {
        const {data} = error.response;
        yield put({type: USER_LOGIN_REQUEST_FAIL, errors: data});
        localStorage.removeItem('token');
        yield put(push('/login'));
    }
}

export function * loginFlow() {
    while (true) {
        const {user} = yield take(USER_LOGIN_REQUEST);
        let response = yield fork(authorize, user);
    }
}

export function * logoutFlow() {
    while (true) {
        const action = yield take(USER_LOGOUT);
        yield fork([
            localStorage, localStorage.removeItem
        ], 'token');
        yield put(push('/login'));
    }

}

export function * register() {
    while (true) {
        const {user} = yield take(USER_REGISTRATION_REQUEST);
        const response = yield call(userRegistrationRequest, user);
        if (response.success) {
            yield put({type: USER_REGISTRATION_REQUEST_SUCCESS});
            yield put(push('/login'));
        } else {
            yield put({type: USER_REGISTRATION_REQUEST_FAIL, errors: response});
        }
    }
}

export function * saveNotificationFlow() {
    while (true) {
        const {notification} = yield take(NOTIFICATION_SAVE_REQUEST);
        const userId = jwtDecode(localStorage.getItem('token'))._doc._id;

        const response = yield call(notificationSaveRequest, {
            ...notification,
            userId
        });
        if (response.success) {
            yield put(push('/dashboard'));
        }
    }
}

export function * fetchNotificationFlow() {
    while (true) {
        const {notification} = yield take(NOTIFICATION_FETCH_REQUEST);
        const userId = jwtDecode(localStorage.getItem('token'))._doc._id;
        const response = yield call(fetchNotifications, userId);
        if (response.success) {
            yield put({type: NOTIFICATION_FETCH_REQUEST_SUCCESS, data: response.data});
        }
    }
}

export function * getNotificationFlow() {
    while (true) {
        const {id} = yield take(NOTIFICATION_GET_REQUEST);
        const response = yield call(getNotification, id);
        if (response.success) {
            yield put({type: NOTIFICATION_GET_REQUEST_SUCCESS, data: response.data});
            yield put(push('/notification'));
        }
    }
}

export function * deleteNotificationFlow() {
    while (true) {
        const {id} = yield take(NOTIFICATION_DELETE_REQUEST);
        const response = yield call(notificationDeleteRequest, id);
        if (response.success) {
            yield put({type: NOTIFICATION_DELETE_REQUEST_SUCCESS});
            yield put(push('/dashboard'));
        }
    }
}

export function * toggleNotificationFlow() {
    while (true) {
        const {id} = yield take(NOTIFICATION_TOGGLE_REQUEST);
        const response = yield call(toggleNotification, id);
        if (response.success) {
            yield put({type: NOTIFICATION_TOGGLE_REQUEST_SUCCESS, id});
        }

    }
}

export default function * root() {
    yield all([
        register(),
        loginFlow(),
        saveNotificationFlow(),
        deleteNotificationFlow(),
        fetchNotificationFlow(),
        getNotificationFlow(),
        logoutFlow(),
        toggleNotificationFlow()
    ])
}