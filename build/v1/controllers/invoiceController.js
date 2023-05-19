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

var _Invoice = _interopRequireDefault(require("../database/Invoice"));

var COSTOKM = 700;

var InvoiceController = /*#__PURE__*/function () {
  function InvoiceController() {
    (0, _classCallCheck2["default"])(this, InvoiceController);
  }

  (0, _createClass2["default"])(InvoiceController, null, [{
    key: "getAllInvoices",
    value: function () {
      var _getAllInvoices = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _yield$Invoice$getAll, rows;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Invoice["default"].getAll();

              case 2:
                _yield$Invoice$getAll = _context.sent;
                rows = _yield$Invoice$getAll.rows;
                return _context.abrupt("return", rows.length < 1 ? res.status(404).json({
                  message: "No existen facturas en la base de datos !!!"
                }) : res.status(200).json(rows));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAllInvoices(_x, _x2) {
        return _getAllInvoices.apply(this, arguments);
      }

      return getAllInvoices;
    }()
  }, {
    key: "createInvoice",
    value: function () {
      var _createInvoice = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var invoices, invoice;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                invoices = req.invoices;
                _context2.next = 3;
                return _Invoice["default"].create({
                  tripId: id,
                  riderId: invoices.pasajero_id,
                  driverId: invoices.conductor_id,
                  cost: distance * COSTOKM + distance * COSTOKM * 0.1,
                  impuesto: cost * 0.1
                });

              case 3:
                invoice = _context2.sent;

                if (invoice) {
                  res.status(200).json({
                    message: "Factura creada con exito !!!"
                  });
                } else {
                  res.status(500).json({
                    message: "No fue posible agregar la factura en la base de datos !!!"
                  });
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function createInvoice(_x3, _x4) {
        return _createInvoice.apply(this, arguments);
      }

      return createInvoice;
    }()
  }]);
  return InvoiceController;
}();

exports["default"] = InvoiceController;
//# sourceMappingURL=invoiceController.js.map