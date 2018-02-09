import { connect } from 'react-redux';
import PageWrapper from '../components/PageWrapper';

export default (Component, submit) => connect(state => ({
  errors: state.user.errors,
}), dispatch => ({
  submit: data => dispatch(submit(data)),
}))(PageWrapper(Component));

