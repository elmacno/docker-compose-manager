import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import LoginForm from './Login.form';
import { Auth } from '../../Services';
import dockerLogo from '../../Assets/docker.svg';
import './Login.css';

class Login extends Component {
  static propTypes = {
    location: PropTypes.object,
    loggedIn: PropTypes.func,
    isLoggedIn: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      loggisLoggedInedIn: false
    };
  }

  submit = async values => {
    try {
      await Auth.logIn(values.username, values.password, values.remember);
      this.setState({ isLoggedIn: Auth.isLoggedIn() });
    } catch (error) {
      this.setState({ error: 'Invalid username or password' });
    }
  };

  componentDidMount() {
    this.setState({ isLoggedIn: Auth.isLoggedIn() });
  }

  render() {
    const { isLoggedIn } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    return isLoggedIn ? (
      <Redirect to={from} />
    ) : (
      <Container fluid className="login-page">
        <Row>
          <Col md="4" className="banner-sec">
            <h1>
              <img src={dockerLogo} alt="Docker Compose Manager" />
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
