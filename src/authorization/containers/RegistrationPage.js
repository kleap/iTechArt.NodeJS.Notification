import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userRegistrationRequest } from './../actions';
import RegistrationForm from './../components/RegistrationForm';
import Panel from './../../components/panel/Panel';

const mapStateToProps = (state) => ({
    errors: state.users.errors
});
class RegistrationPage extends Component {
    register = (user) => {
        this.props.dispatch(userRegistrationRequest(user));
    }
    render() {
        return (
            <div className='d-flex justify-content-center'>
                    <Panel header='Registration'>
                        <RegistrationForm
                            errors={this.props.errors || {}}
                            submit={this.register}
                        />
                    </Panel>
            </div>
        );
    }
}

RegistrationPage.propTypes = {
    errors: PropTypes.object
}

export default connect(mapStateToProps)(RegistrationPage);