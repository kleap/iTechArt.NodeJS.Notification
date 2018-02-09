import React from 'react';
import { Input, Label, FormGroup, FormText } from 'reactstrap';
import PropTypes from 'prop-types';

const TextFieldGroup = props => (
  <FormGroup>
    <Label >{props.label}</Label>
    <Input
      onChange={props.onChange}
      value={props.value}
      type={props.type}
      name={props.field}
      placeholder=""
    />
    <FormText color="danger">
      {props.error}
    </FormText>
  </FormGroup>
);

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextFieldGroup.defaultProps = {
  type: 'text',
  error: null,
};
export default TextFieldGroup;
