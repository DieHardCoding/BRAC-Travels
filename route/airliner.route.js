const express = require('express');
const controller = require('../controller/airliner.controller');
const verifyAuth = require('../middleware/authorization/auth.validation.middleware');
const config = require('../config/main.config');
const router = express.Router();

router.get('/', [verifyAuth.validJWTNeeded,
verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
controller.list]);

router.post('/', [verifyAuth.validJWTNeeded,
verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
controller.createAirliner]);

router.get('/:id', controller.findById);

router.patch('/:id', [verifyAuth.validJWTNeeded,
verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
controller.patchAirliner]);

router.delete('/:id', [verifyAuth.validJWTNeeded,
verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
controller.deleteAirliner]);

module.exports = router;