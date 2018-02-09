import React from 'react';
import BaseForm from 'common/components/BaseForm';

class LogoutForm extends BaseForm {
  componentDidMount() {
    this.props.submit();
  }
  render() {
    return <div />;
  }
}

export default LogoutForm;
