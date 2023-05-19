"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAmount = exports.validateId = exports.validateGPS = exports.validateMyLocation = exports.validateTrip = void 0;

var _helpers = require("../helpers/helpers");

var Joi = require("@hapi/joi");

var validateTrip = function validateTrip(req, res, next) {
  var schema = Joi.object({
    departure: Joi.string().required(),
    destination: Joi.string().required(),
    riderId: Joi.number().integer().required(),
    driverId: Joi.number().integer().required()
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error;

  if (error) return res.status(400).json({
    error: (0, _helpers.cleanJoiValidator)(error.details[0].message)
  });
  return next();
};

exports.validateTrip = validateTrip;

var validateMyLocation = function validateMyLocation(req, res, next) {
  var schema = Joi.object({
    myLocation: Joi.string().required()
  }).options({
    allowUnknown: true
  });

  var _schema$validate2 = schema.validate(req.query),
      error = _schema$validate2.error;

  if (error) return res.status(400).json({
    error: (0, _helpers.cleanJoiValidator)(error.details[0].message)
  });
  return next();
};

exports.validateMyLocation = validateMyLocation;

var validateGPS = function validateGPS(req, res, next) {
  var _req$body = req.body,
      departure = _req$body.departure,
      destination = _req$body.destination;
  var myLocation = req.query.myLocation;

  if (departure) {
    var _getCoordinates = (0, _helpers.getCoordinates)(departure),
        departLat = _getCoordinates.lat,
        departLon = _getCoordinates.lon;

    if (!(0, _helpers.validateCoordinates)(departLat, departLon)) return res.status(400).json({
      error: "Coordenadas del punto de inicio son invalidas, por favor verifique !!!"
    });
  }

  if (destination) {
    var _getCoordinates2 = (0, _helpers.getCoordinates)(destination),
        destLat = _getCoordinates2.lat,
        destLon = _getCoordinates2.lon;

    if (!(0, _helpers.validateCoordinates)(destLat, destLon)) return res.status(404).json({
      error: "Coordenadas del punto de destino son invalidas, por favor verifique !!!"
    });
  }

  if (myLocation) {
    var _getCoordinates3 = (0, _helpers.getCoordinates)(myLocation),
        lat = _getCoordinates3.lat,
        lon = _getCoordinates3.lon;

    if (!(0, _helpers.validateCoordinates)(lat, lon)) return res.status(404).json({
      error: "Coordenadas invalidas, por favor verifique !!!"
    });
  }

  return next();
};

exports.validateGPS = validateGPS;

var validateId = function validateId(req, res, next) {
  var schema = Joi.object({
    id: Joi.number().required()
  });

  var _schema$validate3 = schema.validate(req.params),
      error = _schema$validate3.error;

  if (error) return res.status(400).json({
    error: (0, _helpers.cleanJoiValidator)(error.details[0].message)
  });
  return next();
};

exports.validateId = validateId;

var validateAmount = function validateAmount(req, res, next) {
  var schema = Joi.object({
    amount: Joi.number().positive().precision(2).required()
  });

  var _schema$validate4 = schema.validate(req.params),
      error = _schema$validate4.error;

  if (error) return res.status(400).json({
    error: (0, _helpers.cleanJoiValidator)(error.details[0].message)
  });
  return next();
};

exports.validateAmount = validateAmount;
//# sourceMappingURL=validators.js.map