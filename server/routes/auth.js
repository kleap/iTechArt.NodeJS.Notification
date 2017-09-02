import express from 'express';

import AuthController from './../controllers/authController';

const authController = new AuthController();
let router = express.Router();

router.post('/login', authController.login);

router.post('/register', authController.register);

router.post('/logout', authController.logout);

export default router;