const express = require('express');
const userMiddleware = require('../middleware/user.middleware');

const controller = require('../controller/authentication.controller');
const { userRegistaion } = require('../controller/user.controller');
const VerifyUserMiddleware = require('../middleware/authorization/verify.user.middleware');
const router = express.Router();

router.post('/register', userMiddleware.addNormalUser, userRegistaion);
router.post('/login', [VerifyUserMiddleware.isPasswordAndUserMatch, controller.logIn]);
router.post('/refresh-token', controller.refreshToken);

module.exports = router;