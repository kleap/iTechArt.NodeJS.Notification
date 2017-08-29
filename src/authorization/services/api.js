import axios from 'axios';

export function userRegistrationRequest(user) {
    return axios
        .post('http://localhost:8080/api/users', user)
        .then((res) => ({...res.data}));
}

export function userLoginRequest(user) {
    return axios
        .post('http://localhost:8080/api/auth', user)
        .then((res) => ({
            ...res.data
        }));
}
