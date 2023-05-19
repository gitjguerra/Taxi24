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

var _helpers = require("../helpers/helpers");

var RiderControllers = /*#__PURE__*/function () {
  function RiderControllers() {
    (0, _classCallCheck2["default"])(this, RiderControllers);
  }

  (0, _createClass2["default"])(RiderControllers, null, [{
    key: "getAllRiders",
    value: function () {
      var _getAllRiders = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _yield$Rider$getAll, rows;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Rider["default"].getAll();

              case 2:
                _yield$Rider$getAll = _context.sent;
                rows = _yield$Rider$getAll.rows;
                return _context.abrupt("return", rows.length < 1 ? res.status(404).json({
                  message: "No existen pasajeros en la base de datos !!!"
                }) : res.status(200).json(rows));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAllRiders(_x, _x2) {
        return _getAllRiders.apply(this, arguments);
      }

      return getAllRiders;
    }()
  }, {
    key: "getRiderById",
    value: function () {
      var _getRiderById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var id, _yield$Rider$findByOn, rows;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = req.params.id;
                _context2.next = 3;
                return _Rider["default"].findByOne(id);

              case 3:
                _yield$Rider$findByOn = _context2.sent;
                rows = _yield$Rider$findByOn.rows;

                if (rows[0]) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", res.status(404).send({
                  message: "Pasajero no existe !!!"
                }));

              case 7:
                return _context2.abrupt("return", res.status(200).json(rows[0]));

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getRiderById(_x3, _x4) {
        return _getRiderById.apply(this, arguments);
      }

      return getRiderById;
    }()
  }, {
    key: "getClosestDrivers",
    value: function () {
      var _getClosestDrivers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var _yield$Driver$getAvai, rows, _req$query, myLocation, threshold, driversDistance, closest;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Driver["default"].getAvailableDrivers();

              case 2:
                _yield$Driver$getAvai = _context3.sent;
                rows = _yield$Driver$getAvai.rows;
                _req$query = req.query, myLocation = _req$query.myLocation, threshold = _req$query.threshold;
                driversDistance = [];
                rows.map(function (driver) {
                  var _getCoordinates = (0, _helpers.getCoordinates)(myLocation),
                      lon1 = _getCoordinates.lon,
                      lat1 = _getCoordinates.lat;

                  var _getCoordinates2 = (0, _helpers.getCoordinates)(driver.ubicacion),
                      lon2 = _getCoordinates2.lon,
                      lat2 = _getCoordinates2.lat;

                  var distance = (0, _helpers.calculateDistance)(lat1, lon1, lat2, lon2);
                  driver["distance"] = distance;
                  driversDistance.push(driver);
                });
                closest = (0, _helpers.arraySorter)(driversDistance).slice(0, threshold || 3);
                return _context3.abrupt("return", closest.length < 1 ? res.status(404).json({
                  message: "No existen conductores cerca !!!",
                  options: "Agregar parametro para aumentar la distancia a consultar"
                }) : res.status(200).json(closest));

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getClosestDrivers(_x5, _x6) {
        return _getClosestDrivers.apply(this, arguments);
      }

      return getClosestDrivers;
    }()
  }]);
  return RiderControllers;
}();

exports["default"] = RiderControllers;
//# sourceMappingURL=riderController.js.map