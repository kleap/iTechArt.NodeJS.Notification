import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default(data) => {
  let errors = {};

  if (validator.isEmpty(data.email)) {
    errors.username = 'This field is required';
  }
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (!validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  return Promise.resolve({errors, isValid: isEmpty(errors)});
}