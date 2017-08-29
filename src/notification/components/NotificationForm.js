import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from './../../components/TextFieldGroup';
import { Form } from 'reactstrap';

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
    render() {
        return (
            <Form>
                <TextFieldGroup
                    type='text'
                    label='Theme'
                    field='theme'
                    value={this.state.theme}
                    onChange={(e) => this.onChange(e)}
                />
                <TextFieldGroup
                    type='textarea'
                    label='Message'
                    field='message'
                    value={this.state.message}
                    onChange={(e) => this.onChange(e)}
                />
                <TextFieldGroup
                    type='select'
                    label='Every'
                    field='every'
                    value={this.state.every}
                    onChange={(e) => this.onChange(e)}>
                    <option>Minute</option>
                    <option>Hour</option>
                    <option>Day</option>
                    <option>Month</option>
                    <option>Year</option>
                </TextFieldGroup>
            </Form>
        );
    }
}

export default NotificationForm;