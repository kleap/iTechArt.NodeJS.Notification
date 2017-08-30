import React, {Component} from 'react';
import {Switch, Route} from 'react-router';
import {LoginPage, RegistrationPage} from './../authorization';
import DashboardPage from './../dashboard/containers/DashboardPage';
import Navigation from './Navigation';
import NotificationPage from './../notification/contatiners/NotificationPage';
import {PrivateRoute} from './PrivateRoute';

class Layout extends Component {
    render() {
        return (
            <div>
                <Navigation/>
                <main>
                    <Switch>
                        <Route path='/login' component={LoginPage}/>
                        <Route path='/registration' component={RegistrationPage}/>
                        <PrivateRoute path='/dashboard' component={DashboardPage}/>
                        <PrivateRoute path='/notification' component={NotificationPage}/>
                    </Switch>
                </main>

            </div>
        );
    }
}

export default Layout;