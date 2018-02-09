import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'reactstrap';
import TextFieldGroup from 'common/components/TextFieldGroup';
import BaseForm from 'common/components/BaseForm';
import Panel from 'common/Panel';
import validateInput from './../../../server/shared/validations/login';


class LoginForm extends BaseForm {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <Panel header="Log in">
          <Form className="d-flex flex-column" onSubmit={e => this.onSubmit(e)}>
            <TextFieldGroup
              label="Email"
              type="email"
              field="email"
              value={this.state.email}
              onChange={e => this.onChange(e)}
              error={this.state.errors.email}
            />
            <TextFieldGroup
              label="Password"
              type="password"
              field="password"
              value={this.state.password}
              onChange={e => this.onChange(e)}
              error={this.state.errors.password}
            />
            <Button className="align-self-end">Login</Button>
          </Form>
        </Panel>
      </div>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Object).isRequired,
  initialState: PropTypes.instanceOf(Object).isRequired,
};

LoginForm.defaultProps = {
  initialState: {
    email: '',
    password: '',
  },
  validateInput,
};
export default LoginForm;
