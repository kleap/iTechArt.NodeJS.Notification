import React from 'react';
import PropTypes from 'prop-types';

export default Component => (class extends React.Component {
  static propTypes = {
    errors: PropTypes.objectOf(PropTypes.string),
    submit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    errors: {},
  };
  submit = (data) => {
    this.props.submit(data);
  }

  render() {
    return <Component submit={this.submit} {...this.props} />;
  }
});

