import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, Label, Form, FormGroup, Button} from 'reactstrap';
import TextFieldGroup from './../../components/TextFieldGroup';
import validateInput from './../../../server/shared/validations/login';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: props.errors || {}
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errorss})
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    isValid() {
        const {errors, isValid} = validateInput(this.state);
        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this
                .props
                .login(this.state);
        }
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

export default LoginForm;