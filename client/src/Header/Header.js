import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import './Header.scss';

class Header extends Component {
  render() {
    return (
      <header>
        <nav>
          <Link to="/">
            <Button>Home</Button>
          </Link>
          <Link to="/other">
            <Button>Other</Button>
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
