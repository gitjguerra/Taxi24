"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _errors = _interopRequireDefault(require("../middlewares/errors"));

var _invoiceController = _interopRequireDefault(require("../controllers/invoiceController"));

var _modelValidator = _interopRequireDefault(require("../middlewares/modelValidator"));

var _validators = require("../middlewares/validators");

var invoice = (0, _express.Router)();
invoice.get("/invoices", (0, _errors["default"])(_invoiceController["default"].getAllInvoices));
invoice.post("/invoice", _modelValidator["default"].validateTrip, _modelValidator["default"].validateRider, _modelValidator["default"].validateDriver, _validators.validateAmount, _validators.validateAmount, (0, _errors["default"])(_invoiceController["default"].createInvoice));
var _default = invoice;
exports["default"] = _default;
//# sourceMappingURL=invoiceRoutes.js.map