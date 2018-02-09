import React from 'react';
import { connect } from 'react-redux';
import Loader from './../../components/Loader';

export default Wrapped => connect(state => ({
  loading: state.user.loading,
}))(props => (
  props.loading ?
    <Loader>
      <Wrapped {...props} />
    </Loader> :
    <Wrapped {...props} />));
