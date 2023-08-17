const controller = require('../controller/user.controller');
const verifyAuth = require('../middleware/authorization/auth.validation.middleware');
const express = require('express');
const router = express.Router();
const config = require('../config/main.config');
const userMiddleware = require('../middleware/user.middleware');

router.get('/', [verifyAuth.validJWTNeeded,
verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
controller.listUser]);

router.get('/profile', [verifyAuth.validJWTNeeded,
verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.NORMAL_USER),
controller.profile]);

router.post('/add/admin', [verifyAuth.validJWTNeeded,
verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
userMiddleware.addAdmin, controller.userRegistaion]);

router.get('/:id', [verifyAuth.validJWTNeeded,
verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
controller.getUser]);

router.patch('/:id', [verifyAuth.validJWTNeeded,
verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
controller.patchById]);

router.delete('/:id', [verifyAuth.validJWTNeeded,
verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
controller.removeById]);

module.exports = router;