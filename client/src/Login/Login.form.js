import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const required = value =>
  value || typeof value === 'number' ? undefined : 'Field is Required';

const RenderField = ({ input, label, type }) => (
  <div>
    <Input {...input} placeholder={label} type={type} />
  </div>
);

RenderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string
};

class LoginForm extends Component {
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
            validate={required}
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
            validate={required}
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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool
};

export default reduxForm({
  form: 'login'
})(LoginForm);
