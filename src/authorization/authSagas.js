import {
    USER_REGISTRATION_REQUEST,
    USER_REGISTRATION_REQUEST_FAIL,
    USER_REGISTRATION_REQUEST_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_REQUEST_SUCCESS,
    USER_LOGIN_REQUEST_FAIL,
    USER_LOGOUT
} from './actions/constants';

import { userRegistrationRequest, userLoginRequest } from './services/api';
import { push } from 'react-router-redux';
import { take, call, put, all, fork } from 'redux-saga/effects';

function* authorize(user) {
    try {
        const { token } = yield call(userLoginRequest, user);
        localStorage.setItem('token', token);
        yield put({ type: USER_LOGIN_REQUEST_SUCCESS, isAuth: true });
        yield put(push('/dashboard'));
        return token;
    } catch (error) {
        const { data } = error.response;
        yield put({ type: USER_LOGIN_REQUEST_FAIL, errors: data });
        localStorage.removeItem('token');
        yield put(push('/login'));
    }
}

export function* loginFlow() {
    while (true) {
        const { user } = yield take(USER_LOGIN_REQUEST);
        let response = yield fork(authorize, user);
    }
}

export function* logoutFlow() {
    while (true) {
        const action = yield take(USER_LOGOUT);
        yield fork([
            localStorage, localStorage.removeItem
        ], 'token');
        yield put(push('/login'));
    }

}

export function* registerFlow() {
    while (true) {
        const { user } = yield take(USER_REGISTRATION_REQUEST);
        const response = yield call(userRegistrationRequest, user);
        if (response.success) {
            yield put({ type: USER_REGISTRATION_REQUEST_SUCCESS });
            yield put(push('/login'));
        } else {
            yield put({ type: USER_REGISTRATION_REQUEST_FAIL, errors: response });

        }
    }
}