import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BaseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.initialState,
      errors: props.errors || {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.props.validateInput) {
      this.isValid()
        .then((isValid) => {
          if (isValid) {
            this
              .props
              .submit(this.state);
          }
        });
    }
  }

  isValid() {
    return this.props
      .validateInput(this.state)
      .then(({ errors, isValid }) => {
        if (!isValid) {
          this.setState({ errors });
        }
        return isValid;
      });
  }
}

BaseForm.propTypes = {
  submit: PropTypes.func.isRequired,
  errors: PropTypes.object,
  validateInput: PropTypes.func,
};

BaseForm.defaultProps = {
  validateInput: () => { },
};

export default BaseForm;
