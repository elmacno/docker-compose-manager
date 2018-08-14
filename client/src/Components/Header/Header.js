import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { AuthService } from '../../Services';
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

  handleSignOut = async () => {
    await AuthService.logOut();
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

export default withRouter(Header);
