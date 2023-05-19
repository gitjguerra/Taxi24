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

var _helpers = require("../helpers/helpers");

var DriverController = /*#__PURE__*/function () {
  function DriverController() {
    (0, _classCallCheck2["default"])(this, DriverController);
  }

  (0, _createClass2["default"])(DriverController, null, [{
    key: "getAllDrivers",
    value: function () {
      var _getAllDrivers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _yield$Driver$getAll, rows;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Driver["default"].getAll();

              case 2:
                _yield$Driver$getAll = _context.sent;
                rows = _yield$Driver$getAll.rows;
                return _context.abrupt("return", rows.length < 1 ? res.status(404).json({
                  message: "No se encontraron conductores"
                }) : res.status(200).json(rows));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAllDrivers(_x, _x2) {
        return _getAllDrivers.apply(this, arguments);
      }

      return getAllDrivers;
    }()
  }, {
    key: "getAvailableDrivers",
    value: function () {
      var _getAvailableDrivers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _yield$Driver$getAvai, rows;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Driver["default"].getAvailableDrivers();

              case 2:
                _yield$Driver$getAvai = _context2.sent;
                rows = _yield$Driver$getAvai.rows;
                return _context2.abrupt("return", rows.length < 1 ? res.status(404).json({
                  message: "No existen conductores disponibles por el momento"
                }) : res.status(200).json(rows));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAvailableDrivers(_x3, _x4) {
        return _getAvailableDrivers.apply(this, arguments);
      }

      return getAvailableDrivers;
    }()
  }, {
    key: "getAvailableDriversWithInRange",
    value: function () {
      var _getAvailableDriversWithInRange = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var _yield$Driver$getAvai2, rows, _req$query, myLocation, range, ridersLocation, DriversWithInRange;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Driver["default"].getAvailableDrivers();

              case 2:
                _yield$Driver$getAvai2 = _context3.sent;
                rows = _yield$Driver$getAvai2.rows;
                _req$query = req.query, myLocation = _req$query.myLocation, range = _req$query.range;
                ridersLocation = myLocation.split(",");
                DriversWithInRange = [];
                rows.forEach(function (Driver) {
                  var location = Driver.ubicacion.split(",");
                  var distance = (0, _helpers.calculateDistance)(location[0], location[1], ridersLocation[0], ridersLocation[1]);
                  console.log("distance " + distance + " range: " + range);

                  if (distance <= (range || 3)) {
                    DriversWithInRange.push({
                      Driver: Driver,
                      DriverRange: "".concat(distance, " KM")
                    });
                  }
                });
                return _context3.abrupt("return", DriversWithInRange.length < 1 ? res.status(200).json({
                  message: "No hay conductores cercanos a 3 KM",
                  options: "<distancia> parámetro de consulta para aumentar la distancia"
                }) : res.status(200).json(DriversWithInRange));

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getAvailableDriversWithInRange(_x5, _x6) {
        return _getAvailableDriversWithInRange.apply(this, arguments);
      }

      return getAvailableDriversWithInRange;
    }()
  }, {
    key: "findDriverById",
    value: function () {
      var _findDriverById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var id, _yield$Driver$findByO, rows;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.params.id;
                _context4.next = 3;
                return _Driver["default"].findByOne(id);

              case 3:
                _yield$Driver$findByO = _context4.sent;
                rows = _yield$Driver$findByO.rows;

                if (rows[0]) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", res.status(404).send({
                  message: "Driver no existe en la base de datos"
                }));

              case 7:
                return _context4.abrupt("return", res.status(200).json(rows[0]));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function findDriverById(_x7, _x8) {
        return _findDriverById.apply(this, arguments);
      }

      return findDriverById;
    }()
  }]);
  return DriverController;
}();

exports["default"] = DriverController;
//# sourceMappingURL=driverController.js.map