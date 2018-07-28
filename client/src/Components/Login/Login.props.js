import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    isLoggedIn: state.login.isLoggedIn
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loggedIn: value => dispatch({ type: 'LOGGED_IN', payload: value })
    },
    dispatch
  );

const addProps = Login => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login);
};

export { addProps };
