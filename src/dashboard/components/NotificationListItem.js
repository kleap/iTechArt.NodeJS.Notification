import React, {Component} from 'react';
import PropTypes from 'prop-types';
const NotificationListItem = ({id, theme, lastTime, nextTime}) => {
    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{theme}</td>
            <td>{lastTime}</td>
            <td>{nextTime}</td>
        </tr>
    );
};

NotificationListItem.propTypes = {
    id: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    lastTime: PropTypes.instanceOf(Date),
    nextTime: PropTypes.instanceOf(Date)
}

export default NotificationListItem;