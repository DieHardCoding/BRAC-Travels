const express = require('express');
const controller = require('../controller/airport.controller');
const config = require('../config/main.config');
const verifyAuth = require('../middleware/authorization/auth.validation.middleware');
const router = express.Router();

router.get('/', controller.listAirport);

router.post('/', [verifyAuth.validJWTNeeded,
verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
controller.createAirport]);

router.get('/:id', controller.findById);

router.patch('/:id', [verifyAuth.validJWTNeeded,
verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
controller.patchAirport]);

router.delete('/:id', [verifyAuth.validJWTNeeded,
verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
controller.deleteAirport]);

module.exports = router;