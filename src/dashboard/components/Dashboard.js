import React, {Component} from 'react';
import {Table} from 'reactstrap';
import PropTypes from 'prop-types';
import NotificationListItem from './NotificationListItem';

class Dashboard extends Component {
    render() {
        const elements = [];
        for (let index = 0; index < 5; index++) {
            elements.push(({
                id: index*5,
                theme: 'theme' + index
            }));
        }
        const items = elements.map((e,index)=>(
            <NotificationListItem 
                key={e.id+index}
                id={e.id+'S'}
                theme={e.theme}
            />
        ))
        return (
            <div >
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Theme</th>
                            <th>Last time</th>
                            <th>Next time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </Table>
            </div>

        );
    }
}

Dashboard.propTypes = {
    notifications: PropTypes.array
}

export default Dashboard;