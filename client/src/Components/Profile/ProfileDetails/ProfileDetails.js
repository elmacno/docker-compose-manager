import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import './ProfileDetails.css';

class ProfileDetails extends Component {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      rights: PropTypes.arrayOf(PropTypes.string)
    }),
    toggleEditing: PropTypes.func
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <p>Username: {user.username}</p>
        <p>Rights:</p>
        <ul>{user.rights.map(right => <li key={right}>{right}</li>)}</ul>
        <Button onClick={this.props.toggleEditing}>Edit</Button>
      </div>
    );
  }
}

export default ProfileDetails;
