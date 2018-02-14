import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function normalizeTypeToHeader(type) {
  return `${type.replace(/\b\w/g, l => l.toUpperCase())}!`;
}

const Notification = props => (
  <section className={classnames({
    notification: true,
    [`notification_${props.type}`]: !!props.type,
  })}
  >
    <button className="notification__close-button" onClick={() => props.close(props.id)} />
    <h3 className={classnames({
      notification__header: true,
      [`notification__header_${props.type}`]: !!props.type,
    })}
    >{props.header || normalizeTypeToHeader(props.type)}
    </h3>
    <span className="notification__message">{props.message}</span>
  </section>
);

Notification.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string,
  close: PropTypes.func.isRequired,
  header: PropTypes.string,
  type: PropTypes.string,
};

Notification.defaultProps = { header: '', message: '', type: '' };


export default Notification;
