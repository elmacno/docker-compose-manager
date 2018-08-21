import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

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

export default RenderField;
