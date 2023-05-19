import Driver from "../database/Driver";
import Trip from "../database/Trip";
import { calculateDistance, getCoordinates } from "../helpers/helpers";
import Invoice from "../database/Invoice";

const COSTOKM = 700;

export default class TripController {
  static async createTrip(req, res) {
    const { driver } = req;
    const trip = await Trip.create(req.body);
    await Driver.updateDriver(false, driver.rows[0].id);
    return res
      .status(201)
      .json({ message: "Viaje creado con exito !!! ", trip: trip.rows[0] });
  }

  static async getActiveTrips(req, res) {
    const { rows } = await Trip.getAllActive();
    return rows.length < 1
      ? res.status(404).json({
          message: "No se encontraon viajes en la base de datos !!!",
        })
      : res.status(200).json(rows);
  }
  static async completeTrip(req, res) {
    const { id } = req.params;
    const { trip } = req;
    if (trip.rows[0].estatus) {
      return res.status(409).json({ message: "Viaje ya está finalizado !!!" });
    }
    const { rows } = await Trip.updateTrip(id);
    await Driver.updateDriver(true, rows[0].driver_id);

    const { lon: lon1, lat: lat1 } = getCoordinates(rows[0].departure);
    const { lon: lon2, lat: lat2 } = getCoordinates(rows[0].destination);
    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    const invoice = await Invoice.create({
      tripId: id,
      riderId: rows[0].pasajero_id,
      driverId: rows[0].conductor_id,
      cost: distance * COSTOKM + (distance * COSTOKM * 0.1),
      impuesto: cost * 0.1 
    });
    return res.status(200).json({
      message: "Viaje culminado con exito !!!",
      trip: rows[0],
      invoice: invoice.rows[0],
    });
  }
}
