import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import NotificationListItem from './NotificationListItem';

class Dashboard extends Component {
  render() {
    const items = this
      .props
      .items
      .map((e, index) => (<NotificationListItem
        key={e._id}
        index={index + 1}
        id={e._id}
        lastTime={e.lastTime}
        nextTime={e.nextTime}
        isRunning={e.isRunning}
        theme={e.theme}
        onChoose={this.props.onChoose}
        onToggle={this.props.onToggle}
      />));
    return (
      <div >
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Theme</th>
              <th>Last time</th>
              <th>Next time</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </Table>
      </div>

    );
  }
}

Dashboard.propTypes = {
  items: PropTypes.array,
  onChoose: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Dashboard;
