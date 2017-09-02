import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, Label, Form, FormGroup, Button} from 'reactstrap';
import TextFieldGroup from './../../components/TextFieldGroup';
import validateInput from './../../../server/shared/validations/login';
import BaseForm from './../../components/BaseForm';

class LoginForm extends BaseForm {
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
                    error={this.state.errors.email}/>
                <TextFieldGroup
                    label='Password'
                    type='password'
                    field='password'
                    value={this.state.password}
                    onChange={(e) => this.onChange(e)}
                    error={this.state.errors.password}/>
                <Button className='align-self-end'>Login</Button>
            </Form>

        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired,
    errors: PropTypes.object,
    initialState: PropTypes.object.isRequired
}

LoginForm.defaultProps = {
    initialState: {
        email: '',
        password: ''
    },
    validateInput: validateInput
}
export default LoginForm;