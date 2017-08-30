import express from 'express';
import commonValidations from './../shared/validations/login';
import mongoose from 'mongoose';
import passwordHash from 'password-hash';
import User from './../models/User';
import isEmpty from 'lodash/isEmpty';
import jwt from 'jsonwebtoken';
mongoose.Promise = Promise;

let router = express.Router();

router.post('/', (req, res) => {
    const {errors, isValid} = commonValidations(req.body);
    if (!isValid) {
        res
            .status(400)
            .json(errors);
    } else {
        const {email, password} = req.body;
        User
            .findOne({email: email})
            .exec()
            .then((user) => {
                if (!user) {
                    res
                        .status(400)
                        .json({email: 'Wrong email'});
                } else {
                    if (passwordHash.verify(password, user.passwordHash)) {
                        let token = jwt.sign(user, '047220ee-81ee-45ca-8960-41fe8530f556', {expiresIn: 1});
                        res
                            .status(200)
                            .json({success: true, token});
                    } else {
                        res
                            .status(400)
                            .json({password: 'Wrong password'});
                    }
                }

            })

    }

});

export default router;