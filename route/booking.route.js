const express = require("express");
const verifyAuth = require("../middleware/authorization/auth.validation.middleware");
const controller = require("../controller/booking.controller");
const config = require("../config/main.config");
const router = express.Router();

router.get("/", [
  verifyAuth.validJWTNeeded,
  verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
  controller.list,
]);

router.post("/", controller.addBooking);

router.get("/flight", [
  verifyAuth.validJWTNeeded,
  verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
  controller.searchByFlight,
]);

router.get("/:id", controller.findById);

router.patch("/:id", controller.patchBooking);

router.delete("/:id", [
  verifyAuth.validJWTNeeded,
  verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.ADMIN),
  controller.deleteBooking,
]);

router.get("/pnr/:pnr", controller.findByPNR);

router.post("/ticket", controller.createBookingAndTickets);

module.exports = router;
