import loginValidation from './../shared/validations/login';
import registrationValidation from './../shared/validations/registration';
import userExistanceValidation from './../shared/validations/userExistance';
import passwordHash from 'password-hash';
import User from './../models/User';
import jwt from 'jsonwebtoken';

export default class AuthController {
    register = (req, res) => {
        registrationValidation(req.body).then(({errors, isValid}) => {
            userExistanceValidation(req.body, errors).then(({errors, isValid}) => {
                if (!isValid) {
                    this.sendResponse(res, 400, {
                        success: false,
                        errors
                    });
                } else {
                    this
                        .saveUser(req.body)
                        .then((user) => {
                            console.log(user);
                            this.sendResponse(res, 200, {success: true});
                        });
                }
            });
        });
    }

    saveUser = ({email, password}) => {
        var hashedPassword = passwordHash.generate(password);
        return User.create({email: email, passwordHash: hashedPassword});
    }

    login = (req, res) => {
        loginValidation(req.body).then(({errors, isValid}) => {
            const {email, password} = req.body;
            User
                .findOne({email: email})
                .exec()
                .then((user) => {
                    if (!user) {
                        this.sendResponse(res, 400, {
                            success: false,
                            errors: {
                                email: 'User does not exists'
                            }
                        });
                    } else {
                        let token = this.verifyUser(user, password);
                        if (token) {
                            req.session.token = token;
                            this.sendResponse(res, 200, {
                                success: true,
                                token
                            });
                        } else {
                            this.sendResponse(res, 400, {
                                success: false,
                                errors: {
                                    password: 'Wrong password'
                                }
                            });
                        }
                    }
                });
        });
    }

    verifyUser = (user, password) => {
        if (passwordHash.verify(password, user.passwordHash)) {
            let token = jwt.sign(user, '047220ee-81ee-45ca-8960-41fe8530f556', {expiresIn: 1});
            return token;
        } else {
            return;
        }
    }

    sendResponse(res, status, data) {
        res
            .status(status)
            .json(data);
    }

    logout = (req, res) => {
        req
            .session
            .destroy(() => {
                this.sendResponse(res, 200, {success: true});
            });
    }

};
