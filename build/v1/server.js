"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _debug = _interopRequireDefault(require("debug"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./routes"));

var app = (0, _express["default"])();
var port = process.env.PORT || 3000;
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.get("/", function (req, res) {
  return res.json({
    message: "Servidor escuchando por el puerto ".concat(port)
  });
});
app.use("/api/v1", _routes["default"]);
var debug = (0, _debug["default"])("minutes:start");
app.listen(port, function () {
  return debug("Escuchando por el puerto: ".concat(port));
});
//# sourceMappingURL=server.js.map