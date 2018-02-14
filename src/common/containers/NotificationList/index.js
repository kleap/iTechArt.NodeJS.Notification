import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NotificationList from './../../components/NotificationList';
import { closeNotification } from './../../actions';

export default connect(state => ({
  notifications: state.common.notifications,
}), dispatch => ({
  onNotificationClose: bindActionCreators(closeNotification, dispatch),
}))(NotificationList);
