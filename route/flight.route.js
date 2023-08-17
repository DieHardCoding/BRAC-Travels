const express = require("express");
const verifyAuth = require("../middleware/authorization/auth.validation.middleware");
const controller = require("../controller/flight.controller");
const config = require("../config/main.config");
const router = express.Router();

router.get("/", [
  verifyAuth.validJWTNeeded,
  verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
  controller.list,
]);

router.post("/", [
  verifyAuth.validJWTNeeded,
  verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
  controller.createFlight,
]);

router.get("/search", controller.listFlightInDate);

router.get("/:id", controller.findById);

router.patch("/:id", [
  verifyAuth.validJWTNeeded,
  verifyAuth.minimumPermissionLevelRequired(
    config.permissionLevel.ADMIN,
  ),
  controller.patchFlight
]);

router.delete("/:id", [
  verifyAuth.validJWTNeeded,
  verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
  controller.deleteFlight,
]);

module.exports = router;
