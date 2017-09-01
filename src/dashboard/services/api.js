import axios from 'axios';

export function fetchNotifications(userId) {
    return axios
        .get('http://localhost:8080/api/notifications/' + userId)
        .then(res => ({
            ...res.data
        }))
        .catch((error) => ({success: false}));
}

export function getNotification(id) {
    return axios
        .get('http://localhost:8080/api/notifications/item/' + id)
        .then((res) => ({
            ...res.data
        }))
        .catch((error) => ({success: false}));
}

export function toggleNotification(id) {
    return axios
        .post('http://localhost:8080/api/notifications/item/' + id)
        .then((res) => ({
            ...res.data
        }))
        .catch((error) => ({success: false}));;
}
