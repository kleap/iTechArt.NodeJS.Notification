import express from 'express';
import commonValidations from './../shared/validations/registration';
import mongoose from 'mongoose';
import passwordHash from 'password-hash';
import {uri} from './../constants';
import User from './../models/User';
import isEmpty from 'lodash/isEmpty';
import {sendMail} from './../services/email-manager';

mongoose.Promise = Promise;

let router = express.Router();
function validateInput(data, otherValidations) {
    let {errors} = otherValidations(data);
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

router.post('/', (req, res) => {
    validateInput(req.body, commonValidations).then(({errors, isValid}) => {
        if (!isValid) {
            res
                .status(200)
                .json(errors);
        } else {
            const {email, password} = req.body;
            var hashedPassword = passwordHash.generate(password);
            User.create({
                email: email,
                passwordHash: hashedPassword
            }, (error, user) => {
                if (!error) {
                    res
                        .status(200)
                        .json({success: true});
                }
            })
        }
    });
});

export default router;