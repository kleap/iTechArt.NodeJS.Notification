import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { USER_LOGOUT } from './../authorization/actions/constants';
import { Navbar, Button, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


const mapStateToProps = (state) => ({
    isAuth: state.users.isAuth
});

class Navigation extends Component {
    render() {
        return (
            <Navbar color="faded" light toggleable>
                <NavbarToggler right onClick={this.toggle} />
                <NavbarBrand href="/">Notifications</NavbarBrand>
                {!this.props.isAuth ?
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to='/login'>Log in</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to='/registration'>Register</NavLink>
                        </NavItem>
                    </Nav> :
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button onClick={() => this.props.dispatch({ type: USER_LOGOUT })}>Log out</Button>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to='/notification'>notification</NavLink>
                        </NavItem>
                    </Nav>
                }
            </Navbar>
        );
    }
}

export default connect(mapStateToProps)(Navigation);