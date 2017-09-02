import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (data) => {
    let errors = {};
    if (validator.isEmpty(data.email)) {
        errors.email = 'This field is required';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'This field is required';
    }

    return Promise.resolve({errors, isValid: isEmpty(errors)})
}