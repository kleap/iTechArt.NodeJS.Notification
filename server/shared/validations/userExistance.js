import isEmpty from 'lodash/isEmpty';
import User from './../../models/User';

export default(data, errors) => {
    return User
        .findOne({email: data.email})
        .exec()
        .then((result) => {
            if (result) {
                errors.email = 'There is user with such email';
            }
        })
        .then(() => {
            return {errors, isValid: isEmpty(errors)}
        });
}