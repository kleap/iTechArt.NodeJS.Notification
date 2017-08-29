import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardPage extends Component {
    render() {
        return (
            <div >
                {this.props.isAuth ?
                    <h2>MAIN MAIN PAGE</h2>
                    :
                    <div></div>
                }
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.users.isAuth
});

export default connect(mapStateToProps)(DashboardPage);