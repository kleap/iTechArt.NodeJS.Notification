import {
  NOTIFICATION_SAVE_REQUEST,
  NOTIFICATION_DELETE_REQUEST,
  NOTIFICATION_GET_REQUEST,
  NOTIFICATION_GET_REQUEST_SUCCESS,
  NOTIFICATION_DELETE_REQUEST_SUCCESS
} from './actions/constants';

import { notificationSaveRequest, notificationDeleteRequest } from './services/api';
import { push } from 'react-router-redux';
import { take, call, put, all, fork } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';

export function* saveNotificationFlow() {
  while (true) {
    const { notification } = yield take(NOTIFICATION_SAVE_REQUEST);
    const userId = jwtDecode(localStorage.getItem('token'))._doc._id;
    const response = yield call(notificationSaveRequest, {
      ...notification,
      userId
    });
    if (response.success) {
      yield put({
        type: NOTIFICATION_SAVE_REQUEST
      });
      yield put(push('/dashboard'));
    }
  }
}

export function* deleteNotificationFlow() {
  while (true) {
    const { id } = yield take(NOTIFICATION_DELETE_REQUEST);
    const response = yield call(notificationDeleteRequest, id);
    if (response.success) {
      yield put({
        type: NOTIFICATION_DELETE_REQUEST_SUCCESS
      });
      yield put(push('/dashboard'));
    }
  }
}