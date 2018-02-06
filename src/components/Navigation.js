import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navbar, NavbarToggler, NavbarBrand, Collapse, Nav, NavItem, NavLink } from 'reactstrap';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  get privateNav() {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem hidden={!this.props.isAuth}>
          <NavLink tag={Link} to="/notification">Notification</NavLink>
        </NavItem>
        <NavItem hidden={!this.props.isAuth}>
          <NavLink tag={Link} to="/dashboard">Dashboard</NavLink>
        </NavItem>
        <NavItem hidden={!this.props.isAuth}>
          <NavLink tag={Link} to="/logout">Logout</NavLink>
        </NavItem>
      </Nav>
    );
  }

  get publicNav() {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem hidden={this.props.isAuth}>
          <NavLink tag={Link} to="/login">Log in</NavLink>
        </NavItem>
        <NavItem hidden={this.props.isAuth}>
          <NavLink tag={Link} to="/registration">Register</NavLink>
        </NavItem>
      </Nav>
    );
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Navbar color="faded" light toggleable>
        <NavbarToggler right onClick={this.toggle} />
        <NavbarBrand href="/">Notifications</NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar >
          {this.props.isAuth ? this.privateNav : this.publicNav}
        </Collapse>
      </Navbar>
    );
  }
}

Navigation.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

export default Navigation;
