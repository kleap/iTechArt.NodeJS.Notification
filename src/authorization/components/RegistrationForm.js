import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'reactstrap';
import BaseForm from 'common/components/BaseForm';
import TextFieldGroup from 'common/components/TextFieldGroup';
import Panel from 'common/Panel';
import validateInput from './../../../server/shared/validations/registration';


class RegistrationForm extends BaseForm {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <Panel header="Registration">
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
            <TextFieldGroup
              label="Password confirmation"
              type="password"
              field="passwordConfirmation"
              value={this.state.passwordConfirmation}
              onChange={e => this.onChange(e)}
              error={this.state.errors.passwordConfirmation}
            />
            <Button className="align-self-end">Register</Button>
          </Form>
        </Panel>
      </div>
    );
  }
}

RegistrationForm.propTypes = {
  submit: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Object),
  initialState: PropTypes.instanceOf(Object),
};

RegistrationForm.defaultProps = {
  initialState: {
    email: '',
    password: '',
    passwordConfirmation: '',
  },
  errors: {},
  validateInput,
};
export default RegistrationForm;
