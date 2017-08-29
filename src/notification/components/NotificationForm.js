import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from './../../components/TextFieldGroup';
import {Form, Button, FormGroup} from 'reactstrap';

class NotificationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: "",
            message: "",
            every: ""
        };
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();
        alert('submit')
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <TextFieldGroup
                    type='text'
                    label='Theme'
                    field='theme'
                    value={this.state.theme}
                    onChange={(e) => this.onChange(e)}/>
                <TextFieldGroup
                    type='textarea'
                    label='Message'
                    field='message'
                    value={this.state.message}
                    onChange={(e) => this.onChange(e)}/>
                <TextFieldGroup
                    type='select'
                    label='Every'
                    field='every'
                    value={this.state.every}
                    onChange={(e) => this.onChange(e)}>
                    <option value='min'>Minute</option>
                    <option value='hour'>Hour</option>
                    <option value='day'>Day</option>
                    <option value='month'>Month</option>
                    <option value='year'>Year</option>
                </TextFieldGroup>
                <FormGroup className='d-flex justify-content-between'>
                    <Button color='primary' type='submit'>Save</Button>
                    <Button color='danger' type='button'>Delete</Button>
                </FormGroup>
            </Form>
        );
    }
}

export default NotificationForm;