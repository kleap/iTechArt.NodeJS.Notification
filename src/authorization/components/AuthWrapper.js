import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

export default (Wrapped) => {
  class AuthWrapper extends Component {
    static propTypes = {
      getToken: PropTypes.func.isRequired,
      token: PropTypes.string,
    }

    static defaultProps = { token: '' }

    componentDidMount() {
      this.props.getToken();
    }

    render() {
      let isAuth;
      let user;
      try {
        user = jwtDecode(this.props.token);
        isAuth = true;
      } catch (error) {
        isAuth = false;
      }
      return <Wrapped isAuth={isAuth} user={user} {...this.props} />;
    }
  }
  return AuthWrapper;
};

