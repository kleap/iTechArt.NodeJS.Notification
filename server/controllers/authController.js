import commonValidations from './../shared/validations/login';
import passwordHash from 'password-hash';
import User from './../models/User';

export default class AuthController {
    register = (req, res) => {
        validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
            if (!isValid) {
                res
                    .status(200)
                    .json(errors);
            } else {
                this.saveUser(req.body).then((err) => {

                })
                // if (!error) {
                //     res
                //         .status(200)
                //         .json({ success: true });
                // }

            };
        });
    }

    saveUser = ({ email, password }) => {
        var hashedPassword = passwordHash.generate(password);
        return User.create({
            email: email,
            passwordHash: hashedPassword
        }).exec();
    }
    login = (req, res) => {
        const { errors, isValid } = commonValidations(req.body);
        if (!isValid) {
            res.status(400).json(errors);
        } else {
            const { email, password } = req.body;
            User
                .findOne({ email: email })
                .exec()
                .then((user) => {
                    if (!user) {
                        res
                            .status(400)
                            .json({ email: 'Wrong email' });
                    } else {
                        if (passwordHash.verify(password, user.passwordHash)) {
                            let token = jwt.sign(user, '047220ee-81ee-45ca-8960-41fe8530f556', { expiresIn: 1 });
                            req.session.token = token;
                            this.sendResponse(res, 200, { success: true, token });
                        } else {
                            this.sendResponse(res, 200, { password: 'Wrong password' });
                        }
                    }

                })

        }

    }

    sendResponse(res, status, data) {
        res.status(status).json(data);
    }
    register = (req, res) => {

    }

    logout = (req, res) => {

    }

};
