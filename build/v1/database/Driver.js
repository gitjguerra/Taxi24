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

var Driver = /*#__PURE__*/function () {
  function Driver() {
    (0, _classCallCheck2["default"])(this, Driver);
  }

  (0, _createClass2["default"])(Driver, null, [{
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var queryString;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queryString = "SELECT * FROM conductores";
                _context.next = 3;
                return _index["default"].query(queryString);

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "getAvailableDrivers",
    value: function () {
      var _getAvailableDrivers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var queryString;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                queryString = "SELECT * FROM conductores WHERE disponible=true";
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

      function getAvailableDrivers() {
        return _getAvailableDrivers.apply(this, arguments);
      }

      return getAvailableDrivers;
    }()
  }, {
    key: "findByOne",
    value: function () {
      var _findByOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
        var queryString;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                queryString = "SELECT * FROM conductores WHERE id = $1";
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

      function findByOne(_x) {
        return _findByOne.apply(this, arguments);
      }

      return findByOne;
    }()
  }, {
    key: "updateDriver",
    value: function () {
      var _updateDriver = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(disponible, id) {
        var queryString;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                queryString = "UPDATE conductores SET disponible=$1 WHERE id=$2 RETURNING *";
                _context4.next = 3;
                return _index["default"].query(queryString, [disponible, id]);

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function updateDriver(_x2, _x3) {
        return _updateDriver.apply(this, arguments);
      }

      return updateDriver;
    }()
  }]);
  return Driver;
}();

exports["default"] = Driver;
//# sourceMappingURL=Driver.js.map