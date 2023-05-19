"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _errors = _interopRequireDefault(require("../middlewares/errors"));

var _driverController = _interopRequireDefault(require("../controllers/driverController"));

var _validators = require("../middlewares/validators");

var driver = (0, _express.Router)();
driver.get("/drivers", (0, _errors["default"])(_driverController["default"].getAllDrivers));
driver.get("/drivers/available", (0, _errors["default"])(_driverController["default"].getAvailableDrivers));
driver.get("/drivers/available/range", _validators.validateMyLocation, _validators.validateGPS, (0, _errors["default"])(_driverController["default"].getAvailableDriversWithInRange));
driver.get("/drivers/:id", (0, _errors["default"])(_driverController["default"].findDriverById));
var _default = driver;
exports["default"] = _default;
//# sourceMappingURL=driverRoutes.js.map