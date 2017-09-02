import React, {Component} from 'react';
import PropTypes from 'prop-types';
import validateInput from './../../../server/shared/validations/registration';
import BaseForm from './../../components/BaseForm';
import {
    Input,
    Label,
    Form,
    FormGroup,
    FormText,
    Button
} from 'reactstrap';
import TextFieldGroup from './../../components/TextFieldGroup';

class RegistrationForm extends BaseForm {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form className='d-flex flex-column' onSubmit={(e) => this.onSubmit(e)}>
                <TextFieldGroup
                    label='Email'
                    type='email'
                    field='email'
                    value={this.state.email}
                    onChange={(e) => this.onChange(e)}
                    error={this.state.errors['email']}/>
                <TextFieldGroup
                    label='Password'
                    type='password'
                    field='password'
                    value={this.state.password}
                    onChange={(e) => this.onChange(e)}
                    error={this.state.errors['password']}/>
                <TextFieldGroup
                    label='Password confirmation'
                    type='password'
                    field='passwordConfirmation'
                    value={this.state.passwordConfirmation}
                    onChange={(e) => this.onChange(e)}
                    error={this.state.errors['passwordConfirmation']}/>
                <Button className='align-self-end'>Register</Button>
            </Form>

        );
    }
}

RegistrationForm.propTypes = {
    submit: PropTypes.func.isRequired,
    errors: PropTypes.object,
    initialState: PropTypes.object.isRequired
}

RegistrationForm.defaultProps = {
    initialState: {
        email: '',
        password: '',
        passwordConfirmation: ''
    },
    validateInput: validateInput
}
export default RegistrationForm;