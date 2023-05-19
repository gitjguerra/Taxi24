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

var _Trip = _interopRequireDefault(require("../database/Trip"));

var _helpers = require("../helpers/helpers");

var _Invoice = _interopRequireDefault(require("../database/Invoice"));

var COSTOKM = 700;

var TripController = /*#__PURE__*/function () {
  function TripController() {
    (0, _classCallCheck2["default"])(this, TripController);
  }

  (0, _createClass2["default"])(TripController, null, [{
    key: "createTrip",
    value: function () {
      var _createTrip = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var driver, trip;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                driver = req.driver;
                _context.next = 3;
                return _Trip["default"].create(req.body);

              case 3:
                trip = _context.sent;
                _context.next = 6;
                return _Driver["default"].updateDriver(false, driver.rows[0].id);

              case 6:
                return _context.abrupt("return", res.status(201).json({
                  message: "Viaje creado con exito !!! ",
                  trip: trip.rows[0]
                }));

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createTrip(_x, _x2) {
        return _createTrip.apply(this, arguments);
      }

      return createTrip;
    }()
  }, {
    key: "getActiveTrips",
    value: function () {
      var _getActiveTrips = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _yield$Trip$getAllAct, rows;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Trip["default"].getAllActive();

              case 2:
                _yield$Trip$getAllAct = _context2.sent;
                rows = _yield$Trip$getAllAct.rows;
                return _context2.abrupt("return", rows.length < 1 ? res.status(404).json({
                  message: "No se encontraon viajes en la base de datos !!!"
                }) : res.status(200).json(rows));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getActiveTrips(_x3, _x4) {
        return _getActiveTrips.apply(this, arguments);
      }

      return getActiveTrips;
    }()
  }, {
    key: "completeTrip",
    value: function () {
      var _completeTrip = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var id, trip, _yield$Trip$updateTri, rows, _getCoordinates, lon1, lat1, _getCoordinates2, lon2, lat2, distance, invoice;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.params.id;
                trip = req.trip;

                if (!trip.rows[0].estatus) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", res.status(409).json({
                  message: "Viaje ya está finalizado !!!"
                }));

              case 4:
                _context3.next = 6;
                return _Trip["default"].updateTrip(id);

              case 6:
                _yield$Trip$updateTri = _context3.sent;
                rows = _yield$Trip$updateTri.rows;
                _context3.next = 10;
                return _Driver["default"].updateDriver(true, rows[0].conductor_id);

              case 10:
                _getCoordinates = (0, _helpers.getCoordinates)(rows[0].punto_inicio), lon1 = _getCoordinates.lon, lat1 = _getCoordinates.lat;
                _getCoordinates2 = (0, _helpers.getCoordinates)(rows[0].punto_destino), lon2 = _getCoordinates2.lon, lat2 = _getCoordinates2.lat;
                distance = (0, _helpers.calculateDistance)(lat1, lon1, lat2, lon2);
                _context3.next = 15;
                return _Invoice["default"].create({
                  tripId: id,
                  riderId: rows[0].pasajero_id,
                  driverId: rows[0].conductor_id,
                  cost: distance * COSTOKM + distance * COSTOKM * 0.1,
                  impuesto: cost * 0.1
                });

              case 15:
                invoice = _context3.sent;
                return _context3.abrupt("return", res.status(200).json({
                  message: "Viaje culminado con exito !!!",
                  trip: rows[0],
                  invoice: invoice.rows[0]
                }));

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function completeTrip(_x5, _x6) {
        return _completeTrip.apply(this, arguments);
      }

      return completeTrip;
    }()
  }]);
  return TripController;
}();

exports["default"] = TripController;
//# sourceMappingURL=tripController.js.map