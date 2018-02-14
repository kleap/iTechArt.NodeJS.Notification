
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkToken } from './../actions';

import AuthWrapper from './../components/AuthWrapper';

const mapStateToProps = state => ({
  token: state.user.token,
});
const mapDispatchToProps = dispatch => ({
  checkToken: bindActionCreators(checkToken, dispatch),
});

export default Component => connect(mapStateToProps, mapDispatchToProps)(AuthWrapper(Component));
