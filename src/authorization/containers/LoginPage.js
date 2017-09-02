import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './../components/LoginForm';
import Panel from './../../components/panel/Panel';
import { userLoginRequest } from './../actions/index';

const mapStateToProps = (state) => ({
    errors: state.users.errors
});

class LoginPage extends Component {
    login = (user) => {
        this.props.dispatch(userLoginRequest(user));
    }
    
    render() {
        return (
            <div className='d-flex justify-content-center'>
                <Panel header='Log in'>
                    <LoginForm
                        submit={this.login}
                        errors={this.props.errors || {}} />
                </Panel>
            </div>
        );
    }
}

LoginPage.propTypes = {
    errors: PropTypes.object
}

export default connect(mapStateToProps)(LoginPage);
