import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import dockerLogo from '../../Assets/docker.svg';
import './Header.css';

class Header extends Component {
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

  handleSignOut = () => {
    alert('Signed out (Not really :P)');
  };

  render() {
    return (
      <header>
        <Navbar dark expand="md">
          <NavbarBrand href="/">
            <img src={dockerLogo} className="brand-icon" alt="Docker Compose Manager" />
            Docker Compose Manager
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/containers/">Containers</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.handleSignOut}>
                  Sign out
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;
