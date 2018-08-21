import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Auth } from '../../Services';
import dockerLogo from '../../Assets/docker.svg';
import './Header.css';

class Header extends Component {
  static propTypes = {
    history: PropTypes.any
  };

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
  };

  handleSignOut = async () => {
    await Auth.logOut();
    this.props.history.push('/');
  };

  render() {
    return (
      <header>
        <Navbar dark expand="md">
          <NavbarBrand href="/">
            <img
              src={dockerLogo}
              className="brand-icon"
              alt="Docker Compose Manager"
            />
            Docker Compose Manager
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {Auth.user().username}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/profile">Profile</DropdownItem>
                  {Auth.user().rights.includes('admin') ? (
                    <DropdownItem href="/admin">Admin area</DropdownItem>
                  ) : (
                    ''
                  )}
                  <DropdownItem divider />
                  <DropdownItem onClick={this.handleSignOut}>
                    Sign out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default withRouter(Header);
