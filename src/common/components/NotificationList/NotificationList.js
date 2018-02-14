import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notification from './../Notification';
import _ from 'lodash';

export class NotificationList extends Component {
  static propTypes = {
    notifications: PropTypes.arrayOf(Object).isRequired,
    onNotificationClose: PropTypes.func,
    timeout: PropTypes.number,
  }

  static defaultProps = {
    onNotificationClose: () => { },
    timeout: 3000,
  }

  constructor(props) {
    super(props);
    this.timers = {};
  }

  componentDidMount() {
    const { notifications } = this.props;
    notifications.forEach(this.setTimer);
  }

  componentWillReceiveProps(nextProps) {
    const { notifications } = nextProps;
    const { notifications: oldNotifications } = this.props;
    const difference = _.differenceBy(notifications, oldNotifications, 'id');
    difference.forEach(this.setTimer);
  }

  onNotificationClose = (id) => {
    this.props.onNotificationClose(id);
    clearTimeout(this.timers[id]);
  }

  setTimer = ({ id }) => {
    this.timers[id] = setTimeout(() => {
      this.onNotificationClose(id);
    }, this.props.timeout);
  }

  render() {
    const notifications = this.props.notifications.map(item =>
      <Notification key={item.id} close={this.onNotificationClose} {...item} />);

    return (
      <div className="notification-list">
        {notifications}
      </div>);
  }
}

export default NotificationList;
