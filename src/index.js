import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { userReducer } from './authorization/reducers/reducer';
import Layout from './components/Layout';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = routerMiddleware(history);


const store = createStore(
  combineReducers({
    users: userReducer,
    router: routerReducer
  }),
  {
    users: {
      isAuth: false,
      errors: {}
    }
  },
  compose(
    applyMiddleware(sagaMiddleware, middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f)// connect to redux devtools
);
sagaMiddleware.run(rootSaga);


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <Layout />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
