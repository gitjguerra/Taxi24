"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _driverRoutes = _interopRequireDefault(require("./driverRoutes"));

var _riderRoutes = _interopRequireDefault(require("./riderRoutes"));

var _tripRoutes = _interopRequireDefault(require("./tripRoutes"));

var _invoiceRoutes = _interopRequireDefault(require("./invoiceRoutes"));

var router = (0, _express.Router)();
router.use(_riderRoutes["default"]);
router.use(_driverRoutes["default"]);
router.use(_tripRoutes["default"]);
router.use(_invoiceRoutes["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=index.js.map