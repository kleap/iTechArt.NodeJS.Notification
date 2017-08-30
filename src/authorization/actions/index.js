import {
    USER_REGISTRATION_REQUEST,
    USER_REGISTRATION_REQUEST_SUCCESS,
    USER_REGISTRATION_REQUEST_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_REQUEST_SUCCESS,
    USER_LOGIN_REQUEST_FAIL,
    
} from './constants';

export function userRegistrationRequest(user) {
    return { type: USER_REGISTRATION_REQUEST, user }
}

export function userLoginRequest(user) {
    return { type: USER_LOGIN_REQUEST, user }
}