import React, { Component } from 'react';
import { connect } from 'react-redux';
import Panel from 'common/Panel';

import NotificationForm from './../components/NotificationForm';
import { notificationSaveRequest, notificationDeleteRequest } from './../actions/index';

const mapStateToProps = state => ({ item: state.notification });

class NotificationPage extends Component {
    save = (notification) => {
      this.props.dispatch(notificationSaveRequest(notification));
    }

    delete = (id) => {
      this.props.dispatch(notificationDeleteRequest(id));
    }

    render() {
      return (
        <div>
          <div className="d-flex justify-content-center">
              <Panel header="Notification">
                  <NotificationForm item={this.props.item} save={this.save} delete={this.delete} />
                </Panel>
            </div>
        </div>
      );
    }
}

export default connect(mapStateToProps)(NotificationPage);
