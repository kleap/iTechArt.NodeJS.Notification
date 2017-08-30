import React from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';

function isAuth() {
    return !!localStorage.getItem('token');
}

export const PrivateRoute = ({
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}
        render={props => (isAuth()
        ? (<Component {...props}/>)
        : (<Redirect
            to={{
            pathname: '/login',
            state: {
                from: props.location
            }
        }}/>))}/>
);