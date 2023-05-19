"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Driver = _interopRequireDefault(require("../database/Driver"));

var _Rider = _interopRequireDefault(require("../database/Rider"));

var _Trip = _interopRequireDefault(require("../database/Trip"));

var ModelValidator = /*#__PURE__*/function () {
  function ModelValidator() {
    (0, _classCallCheck2["default"])(this, ModelValidator);
  }

  (0, _createClass2["default"])(ModelValidator, null, [{
    key: "validateDriver",
    value: function () {
      var _validateDriver = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var driverId, driver;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                driverId = req.body.driverId;
                _context.next = 3;
                return _Driver["default"].findByOne(driverId);

              case 3:
                driver = _context.sent;
                req.driver = driver;
                return _context.abrupt("return", driver.rows[0] ? next() : res.status(404).json({
                  message: "Conductor con el id ".concat(driverId, " no se encuentra en la base de datos")
                }));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function validateDriver(_x, _x2, _x3) {
        return _validateDriver.apply(this, arguments);
      }

      return validateDriver;
    }()
  }, {
    key: "validateRider",
    value: function () {
      var _validateRider = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
        var riderId, rider;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                riderId = req.body.riderId;
                _context2.next = 3;
                return _Rider["default"].findByOne(riderId);

              case 3:
                rider = _context2.sent;
                req.rider = rider;
                return _context2.abrupt("return", rider.rows[0] ? next() : res.status(404).json({
                  message: "Pasajero con el id ".concat(riderId, " no se encuentra en la base de datos")
                }));

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function validateRider(_x4, _x5, _x6) {
        return _validateRider.apply(this, arguments);
      }

      return validateRider;
    }()
  }, {
    key: "validateTrip",
    value: function () {
      var _validateTrip = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
        var tripId, trip;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                tripId = req.body.tripId;
                _context3.next = 3;
                return _Trip["default"].findByOne(tripId || req.params.id);

              case 3:
                trip = _context3.sent;
                req.trip = trip;
                return _context3.abrupt("return", trip.rows[0] ? next() : res.status(404).json({
                  message: "El viaje con id ".concat(tripId || req.params.id, " no se encuentra en la base de datos")
                }));

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function validateTrip(_x7, _x8, _x9) {
        return _validateTrip.apply(this, arguments);
      }

      return validateTrip;
    }()
  }]);
  return ModelValidator;
}();

exports["default"] = ModelValidator;
//# sourceMappingURL=modelValidator.js.map