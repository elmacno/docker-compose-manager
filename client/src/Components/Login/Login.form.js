import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { RenderField, Validators } from '../../Helpers';

class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool
  };

  render() {
    const { handleSubmit, invalid, pristine, submitting } = this.props;
    return (
      <Form className="login-form" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username" className="text-uppercase">
            Username
          </Label>
          <Field
            component={RenderField}
            type="text"
            placeholder=""
            name="username"
            validate={Validators.required}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password" className="text-uppercase">
            Password
          </Label>
          <Field
            component={RenderField}
            type="password"
            placeholder=""
            name="password"
            validate={Validators.required}
          />
        </FormGroup>
        <FormGroup check>
          <Label className="form-check-label">
            <Field component={RenderField} type="checkbox" name="remember" />
            <small>Remember Me</small>
          </Label>
          <Button
            type="submit"
            className="btn-login float-right"
            disabled={invalid || pristine || submitting}
          >
            Submit
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'login'
})(LoginForm);
