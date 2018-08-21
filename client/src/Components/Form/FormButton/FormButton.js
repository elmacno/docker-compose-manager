import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Button } from 'reactstrap';
import './FormButton.css';

class FormButton extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    handleClick: PropTypes.func
  };
  render() {
    const { label, className, disabled, handleClick } = this.props;
    return (
      <div className="form-button">
        <FormGroup>
          <Button
            type={handleClick ? undefined : 'submit'}
            className={className}
            disabled={disabled}
          >
            {label}
          </Button>
        </FormGroup>
      </div>
    );
  }
}

export default FormButton;
