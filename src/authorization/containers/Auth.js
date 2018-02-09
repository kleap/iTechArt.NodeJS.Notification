
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getToken } from './../actions';

import AuthWrapper from './../components/AuthWrapper';

const mapStateToProps = state => ({
  token: state.user.token,
});
const mapDispatchToProps = dispatch => ({
  getToken: bindActionCreators(getToken, dispatch),
});

export default Component => connect(mapStateToProps, mapDispatchToProps)(AuthWrapper(Component));
