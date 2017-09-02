import axios from 'axios';

export function userRegistrationRequest(user) {
    return axios
        .post('http://localhost:8080/api/auth/register', user)
        .then((res) => ({
            ...res.data
        })).catch(err=>({
            ...err.response.data
        }));
}

export function userLoginRequest(user) {
    return axios
        .post('http://localhost:8080/api/auth/login', user)
        .then((res) => ({
            ...res.data
        })).catch(err=>({
            ...err.response.data
        }));
}

export function userLogoutRequest(user) {
    return axios
        .post('http://localhost:8080/api/auth/logout')
        .then((res) => ({
            ...res.data
        }));
}
