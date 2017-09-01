import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { userReducer } from './authorization/reducers/reducer';
import { dashboardReducer } from './dashboard/reducer/reducer';
import { notificationReducer } from './notification/reducer/reducer';
import Layout from './components/Layout';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = routerMiddleware(history);
const store = createStore(combineReducers({
  users: userReducer,
  router: routerReducer,
  dashboard: dashboardReducer,
  notification: notificationReducer
}), {
    users: {
      isAuth: isAuth(),
      errors: {}
    },
    dashboard: {
      items: []
    },
    notification: {},
  }, compose(applyMiddleware(sagaMiddleware, middleware), window.devToolsExtension
    ? window.devToolsExtension()
    : f => f));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout />
    </ConnectedRouter>
  </Provider>, document.getElementById('app'));

function isAuth() {
  return !!localStorage.getItem('token');
}