import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Login.css';
import LoginForm from './Login.form';

class Login extends Component {
  submit = values => {
    console.log(values);
  };
  render() {
    return (
      <Container fluid>
        <Row>
          <Col md="4" className="banner-sec">
            <h1>
              <img src="/docker.svg" alt="Docker Compose Manager" />
            </h1>
            <div className="d-block">
              <div className="banner-text">
                <h6>
                  Welcome to
                  <span>Docker Compose Manager</span>
                </h6>
              </div>
            </div>
          </Col>
          <Col md="8" className="login-sec d-flex">
            <div className="login-form-container">
              <h2 className="text-center">Sign in</h2>
              <LoginForm onSubmit={this.submit} />
            </div>
            <div className="copy-text">
              Created by <a href="http://github.com/elmacno">eLmAcNo</a>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
