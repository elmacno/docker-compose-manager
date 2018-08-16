import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      toggleProject: project =>
        dispatch({
          type: 'TOGGLE_PROJECT',
          project,
          payload: !ownProps.projects[project].expanded
        })
    },
    dispatch
  );

const addProps = Home => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home);
};

export { addProps };
