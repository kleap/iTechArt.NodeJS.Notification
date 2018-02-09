import React from 'react';
import { Switch, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import LoadingWrapper from 'common/containers/Loader';
import PrivateRoute from './PrivateRoute';
import { LoginPage, RegistrationPage, LogoutPage } from './../authorization';
import DashboardPage from './../dashboard/containers/DashboardPage';
import NotificationPage from './../notification/contatiners/NotificationPage';
import Navigation from './Navigation';
import AuthWrapper from './../authorization/containers/Auth';
import Notification from './../common/containers/Notification';

const WrappedSwitch = LoadingWrapper(Switch);

const Layout = props => (
  <div>
    <Notification />
    <Navigation isAuth={props.isAuth} />
    <main>
      <WrappedSwitch>
        <PrivateRoute path="/login" component={LoginPage} accessible={!props.isAuth} />
        <PrivateRoute path="/registration" component={RegistrationPage} accessible={!props.isAuth} />
        <PrivateRoute path="/logout" redirect="/login" accessible={props.isAuth} component={LogoutPage} />
        <PrivateRoute path="/dashboard" redirect="/login" accessible={props.isAuth} component={DashboardPage} />
        <PrivateRoute path="/notification" redirect="/login" accessible={props.isAuth} component={NotificationPage} />
      </WrappedSwitch>
    </main>
  </div>);

Layout.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const enhance = compose(
  withRouter,
  AuthWrapper,
);

export default enhance(Layout);
