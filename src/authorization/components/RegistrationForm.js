import React, {Component} from 'react';
import PropTypes from 'prop-types';
import validateInput from './../../../server/shared/validations/registration';

import {
    Input,
    Label,
    Form,
    FormGroup,
    FormText,
    Button
} from 'reactstrap';
import TextFieldGroup from './../../components/TextFieldGroup';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirmation: '',
            errors: props.errors || {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    isValid() {
       return  validateInput(this.state).then(({errors, isValid}) => {
            if (!isValid) {
                this.setState({errors});
            }
            return isValid;
        });

    }

    onSubmit(e) {
        e.preventDefault();
        this
            .isValid()
            .then((isValid) => {
                if (isValid) {
                    this
                        .props
                        .register(this.state);
                }
            });
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
    register: PropTypes.func.isRequired,
    errors: PropTypes.object
}
export default RegistrationForm;