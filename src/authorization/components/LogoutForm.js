import React from 'react';
import BaseForm from './../../components/BaseForm';

class LogoutForm extends BaseForm {
  componentDidMount() {
    this.props.submit();
  }
  render() {
    return null;
  }
}

export default LogoutForm;
