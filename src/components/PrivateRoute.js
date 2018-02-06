import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = props => (props.accessible ? <Route {...props} /> : <Redirect to={props.redirect} />);

PrivateRoute.propTypes = {
  accessible: PropTypes.bool,
  redirect: PropTypes.string,
};

PrivateRoute.defaultProps = {
  accessible: false,
  redirect: '/',
};
export default PrivateRoute;

