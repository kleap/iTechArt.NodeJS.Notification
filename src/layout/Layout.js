import React from 'react';
import { Switch, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import LoadingWrapper from 'common/containers/Loader';
import PrivateRoute from './PrivateRoute';
import { LoginPage, RegistrationPage, LogoutPage } from './../authorization';
import Navigation from './Navigation';
import AuthWrapper from './../authorization/containers/Auth';
import NotificationList from './../common/containers/NotificationList';

const WrappedSwitch = LoadingWrapper(Switch);

const Layout = props => (
  <div>
    <NotificationList timeout={500000} />
    <Navigation isAuth={props.isAuth} />
    <main>
      <WrappedSwitch>
        <PrivateRoute path="/login" component={LoginPage} accessible={!props.isAuth} />
        <PrivateRoute path="/registration" component={RegistrationPage} accessible={!props.isAuth} />
        <PrivateRoute path="/logout" redirect="/login" accessible={props.isAuth} component={LogoutPage} />
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
