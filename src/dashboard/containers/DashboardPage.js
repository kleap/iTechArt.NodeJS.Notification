import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from './../components/Dashboard';
import Panel from './../../components/panel/Panel';
import PropTypes from 'prop-types';

import { notificationFetchRequest, notificationGetRequest, toggleNotification } from './../actions';

const mapStateToProps = (state) => ({ items: state.dashboard.items });

class DashboardPage extends Component {

    componentWillMount() {
        this
            .props
            .dispatch(notificationFetchRequest());
    }

    onChoose = (id) => {
        this
            .props
            .dispatch(notificationGetRequest(id));
    }

    onToggle = (id) => {
        this
            .props
            .dispatch(toggleNotification(id));
    }

    render() {
        return (
            <div>
                <div className='d-flex justify-content-center'>
                    <Panel header='Dashboard' wide>
                        <Dashboard
                            items={this.props.items}
                            onChoose={this.onChoose}
                            onToggle={this.onToggle} />
                    </Panel>
                </div>
            </div>

        );
    }
}

export default connect(mapStateToProps)(DashboardPage);