import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notification from './../../components/Notification';
import { closeNotification } from './../../actions';

export default connect(state => ({
  message: state.common.notification.message,
  header: state.common.notification.header,
  type: state.common.notification.type,
}), dispatch => ({
  close: bindActionCreators(closeNotification, dispatch),
}))(Notification);
