import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
const NotificationListItem = ({
    index,
    id,
    theme,
    lastTime,
    nextTime,
    isRunning,
    onChoose,
    onToggle
}) => {
    return (
        <tr>
            <th scope="row">{index}</th>
            <td onClick={() => onChoose(id)}>
                <Button size='sm' color="link">{theme}</Button>
            </td>
            <td>{lastTime}</td>
            <td>{nextTime}</td>
            <td>
                <Button
                    onClick={(() => onToggle(id))}
                    color={isRunning
                        ? 'danger'
                        : 'success'}>{isRunning
                            ? 'stop'
                            : 'start'}</Button>
            </td>
        </tr>
    );
};

NotificationListItem.propTypes = {
    index: PropTypes.number.isRequired,
    isRunning: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    lastTime: PropTypes.string,
    nextTime: PropTypes.string,
    onChoose: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired
}

export default NotificationListItem;