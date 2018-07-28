import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import Fetch from '../Services/Fetch';
import { addProps } from './Home.props';
import './Home.css';

class Home extends Component {
  static propTypes = {
    containers: PropTypes.array,
    setContainers: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  async componentDidMount() {
    try {
      let containers = await Fetch('/containers');
      this.props.setContainers(containers);
    } catch (error) {
      let errorMessage = await error;
      console.error('Failed to get the containers:', errorMessage);
    }
  }

  render() {
    return (
      <div>
        <header>
          <Navbar expand="md">
            <NavbarBrand href="/">
              <img src="docker.svg" className="brand-icon" />
              Docker Compose Manager
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/components/">Components</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/reactstrap/reactstrap">
                    GitHub
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Option 1</DropdownItem>
                    <DropdownItem>Option 2</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Reset</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </header>
        <main />
        <footer />
        <p> This is the Home page </p>
        <div>
          {this.props.containers.length === 0 ? (
            <p> There are no containers </p>
          ) : (
            <p> There are {this.props.containers.length} containers</p>
          )}
        </div>
      </div>
    );
  }
}

export default addProps(Home);
