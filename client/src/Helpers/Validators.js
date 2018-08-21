class Validators {
  static required = value =>
    value || typeof value === 'number' ? undefined : 'Field is Required';
}

export default Validators;
