import { connect } from 'react-redux';

const addProps = ProfileForm => {
  return connect()(ProfileForm);
};

export { addProps };
