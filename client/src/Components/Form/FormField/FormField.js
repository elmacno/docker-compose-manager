import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
import { Field } from 'redux-form';
import { RenderField } from '../../../Helpers';
import './FormField.css';

class FormField extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    validators: PropTypes.arrayOf(PropTypes.func)
  };

  render() {
    const { validators, label, type, name } = this.props;
    return (
      <div className="form-field">
        <FormGroup>
          <Label for={name} className="text-uppercase">
            {label}
          </Label>
          <Field
            component={RenderField}
            type={type}
            placeholder=""
            name={name}
            validate={validators}
          />
        </FormGroup>
      </div>
    );
  }
}

export default FormField;
