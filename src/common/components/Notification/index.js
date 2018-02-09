import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Notification.css';

class Notification extends React.PureComponent {
  static propTypes = {
    message: PropTypes.string,
    close: PropTypes.func.isRequired,
    header: PropTypes.string,
    type: PropTypes.string,
  }

  static defaultProps = { header: 'Attention!', message: '', type: '' }


  componentWillUpdate(nextProps) {
    if (nextProps.message || nextProps.header) {
      this.timer = setTimeout(() => {
        this.props.close();
      }, 3000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  close = () => {
    clearTimeout(this.timer);
    this.props.close();
  }

  render() {
    return (
      this.props.message ?
        <section className={classnames({
          notification: true,
          [`notification_${this.props.type}`]: !!this.props.type,
        })}
        >
          <button className="notification__close-button" onClick={this.close} />

          <h3 className={classnames({
            notification__header: true,
            [`notification__header_${this.props.type}`]: !!this.props.type,
          })}
          >{this.props.header}
          </h3>
          <span className="notification__message">{this.props.message}</span>
        </section> : null
    );
  }
}

export default Notification;
