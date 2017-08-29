import React,{Component} from 'react';
import { Input, Label, FormGroup, FormText } from 'reactstrap';
import PropTypes from 'prop-types';

class TextFieldGroup extends Component {
    render() {
        return (
            <FormGroup>
                <Label >{this.props.label}</Label>
                <Input
                    onChange={this.props.onChange}
                    value={this.props.value}
                    type={this.props.type}
                    name={this.props.field}
                    placeholder="">
                    {this.props.children}
                    </Input>
                <FormText color="danger">
                    {this.props.error}
                </FormText>
            </FormGroup>
        );
    }
}

TextFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

TextFieldGroup.defaultProps = {
    type: 'text'
}
export default TextFieldGroup;