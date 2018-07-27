import React from 'react';
import PropTypes from 'prop-types';
import AuthService from './Services/AuthService';
import { Redirect, Route } from 'react-router-dom';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = AuthService.isLoggedIn();

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

AuthenticatedRoute.propTypes = {
  component: PropTypes.any.isRequired,
  location: PropTypes.object
};

export default AuthenticatedRoute;
