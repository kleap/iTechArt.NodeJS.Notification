import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import NotificationForm from './../components/NotificationForm';
import Panel from './../../components/panel/Panel';
import {notificationSaveRequest, notificationDeleteRequest} from './../actions/index';

const mapStateToProps = (state) => ({item: state.notification});

class NotificationPage extends Component {
    save = (notification) => {
        this
            .props
            .dispatch(notificationSaveRequest(notification));
    }

    delete = (id) => {
        this
            .props
            .dispatch(notificationDeleteRequest(id));
    }

    cancel = () => {
        this
            .props
            .dispatch(push('/dashboard'));
    }

    render() {
        return (
            <div>
                <div className='d-flex justify-content-center'>
                    <Panel header='Notification'>
                        <NotificationForm item={this.props.item} save={this.save} delete={this.delete}/>
                    </Panel>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(NotificationPage);