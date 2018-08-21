import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'avataaars';
import { reduxForm } from 'redux-form';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Validators } from '../../../Helpers';
import { FormField } from '../../Form';
import { addProps } from './ProfileForm.props';
import './ProfileForm.css';

class ProfileForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool
  };

  render() {
    const { handleSubmit, invalid, pristine, submitting } = this.props;
    return (
      <Form className="profile-form" onSubmit={handleSubmit}>
        <Row>
          <Col md={{ size: 4, offset: 2 }}>
            <div className="avatar">
              <Avatar avatarStyle="Circle" />
            </div>
          </Col>
          <Col md={4}>
            <FormField
              label="First name"
              type="text"
              name="firstName"
              validators={[Validators.required]}
            />
            <FormField
              label="Last name"
              type="text"
              name="lastName"
              validators={[Validators.required]}
            />
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <FormGroup>
              <Button
                type="submit"
                className="btn-profile float-right"
                disabled={invalid || pristine || submitting}
              >
                Submit
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'profile'
})(addProps(ProfileForm));
