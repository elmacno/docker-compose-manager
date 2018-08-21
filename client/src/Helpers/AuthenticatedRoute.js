import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { Auth } from '../Services';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = Auth.isLoggedIn();

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
