import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import userReducer from './authorization/reducers';
import commonReducer from './common/reducers';
import { dashboardReducer } from './dashboard/reducer/reducer';
import { notificationReducer } from './notification/reducer/reducer';
import Layout from './layout/Layout';
import * as authApi from './authorization/api';
import apiMiddleware from './middleware/callApi';
import actions from './actions';

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(combineReducers({
  user: userReducer,
  router: routerReducer,
  dashboard: dashboardReducer,
  notification: notificationReducer,
  common: commonReducer,
}), {
  dashboard: {
    items: [],
  },
  notification: {},
}, compose(applyMiddleware(middleware, thunk.withExtraArgument(authApi), apiMiddleware(actions)), window.devToolsExtension
  ? window.devToolsExtension()
  : f => f));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
);

