import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addProps } from './Profile.props';
import Page from '../Page';
import ProfileForm from './ProfileForm';
import ProfileDetails from './ProfileDetails';
import { Auth } from '../../Services';
import './Profile.css';

class Profile extends Component {
  static propTypes = {
    isEditing: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      rights: PropTypes.arrayOf(PropTypes.string)
    }),
    setUser: PropTypes.func,
    setIsEditing: PropTypes.func
  };

  handleSubmit = values => console.log(values);

  handleToggleEditing = () => this.props.setIsEditing(true);

  componentDidMount() {
    let user = Auth.user();
    this.props.setUser(user);
  }

  render() {
    const { isEditing, user } = this.props;
    return (
      <Page className="profile">
        <h2 className="text-center">Your profile</h2>
        {isEditing ? (
          <ProfileForm onSubmit={this.handleSubmit} />
        ) : (
          <ProfileDetails
            user={user}
            toggleEditing={this.handleToggleEditing}
          />
        )}
      </Page>
    );
  }
}

export default addProps(Profile);
