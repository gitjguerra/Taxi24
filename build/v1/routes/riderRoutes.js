"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _errors = _interopRequireDefault(require("../middlewares/errors"));

var _riderController = _interopRequireDefault(require("../controllers/riderController"));

var _validators = require("../middlewares/validators");

var rider = (0, _express.Router)();
rider.get("/riders/closest", _validators.validateMyLocation, _validators.validateGPS, (0, _errors["default"])(_riderController["default"].getClosestDrivers));
rider.get("/riders/:id", _validators.validateId, (0, _errors["default"])(_riderController["default"].getRiderById));
rider.get("/riders", (0, _errors["default"])(_riderController["default"].getAllRiders));
var _default = rider;
exports["default"] = _default;
//# sourceMappingURL=riderRoutes.js.map