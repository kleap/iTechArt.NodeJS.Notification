import axios from 'axios';

export function notificationSaveRequest(notification) {
    return axios
        .post('http://localhost:8080/api/notifications', notification)
        .then((res) => ({
            ...res.data
        }));
}
export function notificationDeleteRequest(id) {
    return axios
        .delete('http://localhost:8080/api/notifications/item/' + id)
        .then((res) => ({
            ...res.data
        }));
}