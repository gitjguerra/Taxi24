"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _errors = _interopRequireDefault(require("../middlewares/errors"));

var _tripController = _interopRequireDefault(require("../controllers/tripController"));

var _modelValidator = _interopRequireDefault(require("../middlewares/modelValidator"));

var _validators = require("../middlewares/validators");

var trip = (0, _express.Router)();
trip.put("/trips/:id/complete", _validators.validateId, _modelValidator["default"].validateTrip, (0, _errors["default"])(_tripController["default"].completeTrip));
trip.post("/trips", _validators.validateTrip, _validators.validateGPS, _modelValidator["default"].validateRider, _modelValidator["default"].validateDriver, (0, _errors["default"])(_tripController["default"].createTrip));
trip.get("/trips", (0, _errors["default"])(_tripController["default"].getActiveTrips));
var _default = trip;
exports["default"] = _default;
//# sourceMappingURL=tripRoutes.js.map