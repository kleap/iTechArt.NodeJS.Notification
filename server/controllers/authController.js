import loginValidation from './../shared/validations/login';
import registrationValidation from './../shared/validations/registration';
import userExistanceValidation from './../shared/validations/userExistance';
import passwordHash from 'password-hash';
import User from './../models/User';
import jwt from 'jsonwebtoken';

export default class AuthController {
  register = (req, res) => {
    registrationValidation(req.body)
      .then(({ errors }) => userExistanceValidation(req.body, errors))
      .then(({ errors, isValid }) => {
        if (!isValid) {
          res.status(400).json({ success: false, errors });
        }
        this.saveUser(req.body)
          .then((user) => {
            const token = jwt.sign(user, '047220ee-81ee-45ca-8960-41fe8530f556', { expiresIn: 1 });
            res.status(200).json({ success: true, token });
          });
      });
  }

  saveUser({ email, password }) {
    const hashedPassword = passwordHash.generate(password);
    return User.create({ email, passwordHash: hashedPassword });
  }

  login = (req, res) => {
    loginValidation(req.body).then(({ errors, isValid }) => {
      const { email, password } = req.body;
      User.findOne({ email }).exec()
        .then((user) => {
          if (!user) {
            res.status(400).json({
              success: false,
              errors: {
                email: 'User does not exists',
              },
            });
          } else {
            const token = this.verifyUser(user, password);
            if (token) {
              req.session.token = token;
              res.status(200).json({
                success: true,
                token,
              });
            } else {
              res.status(400).json({
                success: false,
                errors: {
                  password: 'Wrong password',
                },
              });
            }
          }
        });
    });
  }

  verifyUser = (user, password) => {
    if (passwordHash.verify(password, user.passwordHash)) {
      const token = jwt.sign(user, '047220ee-81ee-45ca-8960-41fe8530f556', { expiresIn: 1 });
      return token;
    }
  }


  logout(req, res) {
    req.session.destroy(() => {
      res.status(200).json({
        success: true,
      });
    });
  }
}
