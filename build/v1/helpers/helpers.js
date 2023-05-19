"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateCoordinates = exports.cleanJoiValidator = exports.getCoordinates = exports.arraySorter = exports.calculateDistance = void 0;

var calculateDistance = function calculateDistance(lat1, lon1, lat2, lon2) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return parseFloat(dist.toFixed(1));
  }
};

exports.calculateDistance = calculateDistance;

var arraySorter = function arraySorter(myArray) {
  return myArray.sort(function (a, b) {
    if (a.distance < b.distance) {
      return -1;
    }

    if (a.distance > b.distance) {
      return 1;
    }

    return 0;
  });
};

exports.arraySorter = arraySorter;

var getCoordinates = function getCoordinates(coords) {
  coords = coords.replace(" ", "").split(",");
  return {
    lat: coords[0],
    lon: coords[1]
  };
};

exports.getCoordinates = getCoordinates;

var cleanJoiValidator = function cleanJoiValidator(error) {
  return error.replace(/[^a-zA-Z ]/g, "");
};

exports.cleanJoiValidator = cleanJoiValidator;

var validateCoordinates = function validateCoordinates(lat, lon) {
  var ck_lat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
  var ck_lon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
  var validLat = ck_lat.test(lat);
  var validLon = ck_lon.test(lon);

  if (validLat && validLon) {
    return true;
  } else {
    return false;
  }
};

exports.validateCoordinates = validateCoordinates;
//# sourceMappingURL=helpers.js.map