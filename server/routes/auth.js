import express from 'express';
import commonValidations from './../shared/validations/login';
import mongoose from 'mongoose';
import passwordHash from 'password-hash';
import User from './../models/User';
import isEmpty from 'lodash/isEmpty';
mongoose.Promise = Promise;

let router = express.Router();

router.post('/', (req, res) => {
    const { errors, isValid } = commonValidations(req.body);
    if (!isValid) {
        res.status(400).json(errors);
    } else {
        const { email, password } = req.body;
        User.findOne({ email: email })
            .exec()
            .then((user) => {
                if (!user) {
                    res.status(400).json({ email: 'Wrong email' });
                } else {
                    if (passwordHash.verify(password, user.passwordHash)) {
                        req.session.userId = user._id;
                        res.status(200).json({ success: true, token: req.session.userId });
                    } else {
                        res.status(400).json({ password: 'Wrong password' });
                    }
                }

            })

    }

});

export default router;