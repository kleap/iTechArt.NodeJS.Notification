import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from './../components/Dashboard';
import Panel from './../../components/panel/Panel';
class DashboardPage extends Component {
    render() {
        return (
            <div>
                <div className='d-flex justify-content-center'>
                    <Panel header='Dashboard' wide>
                        <Dashboard />
                    </Panel>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.users.isAuth
});

export default connect(mapStateToProps)(DashboardPage);