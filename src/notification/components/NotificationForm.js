import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from 'common/components/TextFieldGroup';
import { Form, Button, FormGroup } from 'reactstrap';

class NotificationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: props.item.theme || '',
      message: props.item.message || '',
      interval: props.item.interval || '',
    };
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onDelete = () => {
    if (this.props.item && this.props.item.id) {
      this
        .props
        .delete(this.props.item.id);
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this
      .props
      .save({
        id: this.props.item.id,
        ...this.state,
      });
  }

  render() {
    return (
      <Form onSubmit={e => this.onSubmit(e)}>
        <TextFieldGroup
          type="text"
          label="Theme"
          field="theme"
          value={this.state.theme}
          onChange={e => this.onChange(e)}
        />
        <TextFieldGroup
          type="textarea"
          label="Message"
          field="message"
          value={this.state.message}
          onChange={e => this.onChange(e)}
        />
        <TextFieldGroup
          type="select"
          label="Interval"
          field="interval"
          value={this.state.interval}
          onChange={e => this.onChange(e)}
        >
          <option >None</option>
          <option value={1}>Minute</option>
          <option value={1 * 60}>Hour</option>
          <option value={1 * 60 * 24}>Day</option>
          <option value={1 * 60 * 24 * 30}>Month</option>
          <option value={1 * 60 * 24 * 30 * 365}>Year</option>
        </TextFieldGroup>
        <FormGroup className="d-flex justify-content-between">
          <Button color="primary" type="submit">Save</Button>
          <Button color="danger" onClick={this.onDelete} type="button">Delete</Button>
        </FormGroup>
      </Form>
    );
  }
}

export default NotificationForm;
