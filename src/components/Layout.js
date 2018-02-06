import React from 'react';
import { Switch } from 'react-router';
import PropTypes from 'prop-types';

import PrivateRoute from './PrivateRoute';
import { LoginPage, RegistrationPage, LogoutPage } from './../authorization';
import DashboardPage from './../dashboard/containers/DashboardPage';
import NotificationPage from './../notification/contatiners/NotificationPage';
import Navigation from './Navigation';
import Auth from './Auth';

const Layout = props => (
  <div>
    <Navigation isAuth={props.isAuth} />
    <main>
      <Switch>
        <PrivateRoute path="/login" component={LoginPage} accessible={!props.isAuth} />
        <PrivateRoute path="/registration" component={RegistrationPage} accessible={!props.isAuth} />
        <PrivateRoute path="/logout" redirect="/login" accessible={props.isAuth} component={LogoutPage} />
        <PrivateRoute path="/dashboard" redirect="/login" accessible={props.isAuth} component={DashboardPage} />
        <PrivateRoute path="/notification" redirect="/login" accessible={props.isAuth} component={NotificationPage} />
      </Switch>
    </main>
  </div>);

Layout.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

export default Auth(Layout);
