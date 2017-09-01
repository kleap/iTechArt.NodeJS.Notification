import * as notification from './notification/notificationSagas';
import * as auth from './authorization/authSagas.js';
import * as dashboard from './dashboard/dashboardSagas';

import { all } from 'redux-saga/effects';

export default function* root() {
    yield all([
        auth.registerFlow(),
        auth.loginFlow(),
        auth.logoutFlow(),
        notification.saveNotificationFlow(),
        notification.deleteNotificationFlow(),
        dashboard.getNotificationFlow(),
        dashboard.fetchNotificationFlow(),
        dashboard.toggleNotificationFlow()
    ])
}