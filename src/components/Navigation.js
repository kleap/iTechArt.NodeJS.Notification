import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { USER_LOGOUT } from './../authorization/actions/constants';
import {
    Navbar,
    Button,
    NavbarToggler,
    NavbarBrand,
    Collapse,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

const mapStateToProps = (state) => ({ isAuth: state.users.isAuth });

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Navbar color="faded" light toggleable>
                <NavbarToggler right onClick={this.toggle} />
                <NavbarBrand href="/">Notifications</NavbarBrand>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to='/notification'>Notification</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to='/dashboard'>Dashboard</NavLink>
                        </NavItem>
                        <NavItem hidden={!this.props.isAuth}>
                            <NavLink role='button' onClick={() => this.props.dispatch({ type: USER_LOGOUT })}>Log out</NavLink>
                        </NavItem>
                        <NavItem hidden={this.props.isAuth}>
                            <NavLink tag={Link} to='/login'>Log in</NavLink>
                        </NavItem>
                        <NavItem hidden={this.props.isAuth}>
                            <NavLink tag={Link} to='/registration'>Register</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>

            </Navbar>
        );
    }
}

export default connect(mapStateToProps)(Navigation);