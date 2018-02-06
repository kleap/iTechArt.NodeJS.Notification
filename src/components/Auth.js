import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { getToken } from './../authorization/actions';
import { bindActionCreators } from 'redux';

export default (Wrapped) => {
  class AuthWrapper extends Component {
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

  const mapStateToProps = state => ({
    token: state.user.token,
  });
  const mapDispatchToProps = dispatch => ({
    getToken: bindActionCreators(getToken, dispatch),
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthWrapper));
};

