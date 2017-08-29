import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotificationForm from './../components/NotificationForm';
import Panel from './../../components/panel/Panel';
class NotificationPage extends Component {
    render() {
        return (
            <div>
                <div className='d-flex justify-content-center'>
                    <Panel header='Notification'>
                        <NotificationForm
                            register={this.register}
                        />
                    </Panel>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(NotificationPage);