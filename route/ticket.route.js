const express = require('express');
const verifyAuth = require('../middleware/authorization/auth.validation.middleware');
const controller = require('../controller/ticket.controller');
const config = require('../config/main.config');
const router = express.Router();

router.get('/', [verifyAuth.validJWTNeeded,
verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
controller.list]);

router.post('/', controller.createTicket);

router.get('/', controller.findById);

router.delete('/', [verifyAuth.validJWTNeeded,
verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
controller.deleteTicket]);

router.patch('/', controller.patchTicket);

module.exports = router;