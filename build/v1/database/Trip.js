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

var _index = _interopRequireDefault(require("./index"));

var Trip = /*#__PURE__*/function () {
  function Trip() {
    (0, _classCallCheck2["default"])(this, Trip);
  }

  (0, _createClass2["default"])(Trip, null, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        var queryString;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queryString = "INSERT INTO viajes (punto_inicio, punto_destino, estatus, pasajero_id, conductor_id) \n    VALUES ($1, $2, false, $3, $4) RETURNING *";
                _context.next = 3;
                return _index["default"].query(queryString, Object.values(data));

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "getAllActive",
    value: function () {
      var _getAllActive = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var queryString;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                queryString = "SELECT * FROM viajes WHERE estatus=true";
                _context2.next = 3;
                return _index["default"].query(queryString);

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAllActive() {
        return _getAllActive.apply(this, arguments);
      }

      return getAllActive;
    }()
  }, {
    key: "updateTrip",
    value: function () {
      var _updateTrip = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
        var queryString;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                queryString = "UPDATE viajes SET estatus=true WHERE id=$1 RETURNING *";
                _context3.next = 3;
                return _index["default"].query(queryString, [id]);

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function updateTrip(_x2) {
        return _updateTrip.apply(this, arguments);
      }

      return updateTrip;
    }()
  }, {
    key: "findByOne",
    value: function () {
      var _findByOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
        var queryString;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                queryString = "SELECT * FROM viajes WHERE id = $1";
                _context4.next = 3;
                return _index["default"].query(queryString, [id]);

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function findByOne(_x3) {
        return _findByOne.apply(this, arguments);
      }

      return findByOne;
    }()
  }]);
  return Trip;
}();

exports["default"] = Trip;
//# sourceMappingURL=Trip.js.map