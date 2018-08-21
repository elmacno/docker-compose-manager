import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import Header from '../Header';
import Footer from '../Footer';
import './Page.css';

class Page extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  };
  render() {
    const { children, className } = this.props;
    return (
      <div className={`page ${className}`}>
        <Header />
        <main>
          <Container>{children}</Container>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Page;
