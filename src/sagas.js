import {
    USER_REGISTRATION_REQUEST,
    USER_REGISTRATION_REQUEST_FAIL,
    USER_REGISTRATION_REQUEST_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_REQUEST_SUCCESS,
    USER_LOGIN_REQUEST_FAIL
} from './authorization/actions/constants';
import { userRegistrationRequest, userLoginRequest } from './authorization/services/api';
import { push } from 'react-router-redux';
import { take, call, put, all } from 'redux-saga/effects';

export function* register() {
    while (true) {
        let action = yield take(USER_REGISTRATION_REQUEST);
        let user = action.user;

        const response = yield call(userRegistrationRequest, user);
        if (response.success) {
            yield put({ type: USER_REGISTRATION_REQUEST_SUCCESS });
            yield put(push('/login'));
        } else {
            yield put({ type: USER_REGISTRATION_REQUEST_FAIL, errors: response });
        }
    }
}

export function* login() {
    while (true) {
        let action = yield take(USER_LOGIN_REQUEST);

        let response = yield call(userLoginRequest, action.user);
        console.log(response);
        if (response.success) {
            yield put({ type: USER_LOGIN_REQUEST_SUCCESS, userId: response.userId });
            yield put(push('/dashboard'));
        } else {
            yield put({ type: USER_LOGIN_REQUEST_FAIL, errors: response });
        }
    }
}



export default function* root() {
    yield all([register(), login()])
}