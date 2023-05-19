import Driver from "../database/Driver";
import Rider from "../database/Rider";
import Trip from "../database/Trip";

export default class ModelValidator {
  static async validateDriver(req, res, next) {
    const { driverId } = req.body;
    const driver = await Driver.findByOne(driverId);
    req.driver = driver;
    return driver.rows[0]
      ? next()
      : res.status(404).json({
          message: `Conductor con el id ${driverId} no se encuentra en la base de datos`,
        });
  }

  static async validateRider(req, res, next) {
    const { riderId } = req.body;
    const rider = await Rider.findByOne(riderId);
    req.rider = rider;
    return rider.rows[0]
      ? next()
      : res.status(404).json({
          message: `Pasajero con el id ${riderId} no se encuentra en la base de datos`,
        });
  }
  
  static async validateTrip(req, res, next) {
    const { tripId } = req.body;
    const trip = await Trip.findByOne(tripId || req.params.id);
    req.trip = trip;
    return trip.rows[0]
      ? next()
      : res.status(404).json({
          message: `El viaje con id ${tripId || req.params.id} no se encuentra en la base de datos`,
        });
  }
}
