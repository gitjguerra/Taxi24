import Driver from "../database/Driver";
import Rider from "../database/Rider";
import { getCoordinates, calculateDistance, arraySorter } from "../helpers/helpers";

export default class RiderControllers {

  static async getAllRiders(req, res) {
    const { rows } = await Rider.getAll();
    return rows.length < 1
      ? res.status(404).json({
          message: "No existen pasajeros en la base de datos !!!",
        })
      : res.status(200).json(rows);
  }

  static async getRiderById(req, res) {
    const { id } = req.params;
    const { rows } = await Rider.findByOne(id);
    if (!rows[0]) {
      return res.status(404).send({ message: "Pasajero no existe !!!" });
    }
    return res.status(200).json(rows[0]);
  }

  static async getClosestDrivers(req, res) {
    const { rows } = await Driver.getAvailableDrivers();
    const { myLocation, threshold } = req.query;
    const driversDistance = [];
    rows.map((driver) => {
      const { lon: lon1, lat: lat1 } = getCoordinates(myLocation);
      const { lon: lon2, lat: lat2 } = getCoordinates(driver.ubicacion);
      const distance = calculateDistance(lat1, lon1, lat2, lon2);
      driver["distance"] = distance;
      driversDistance.push(driver);
    });
    const closest = arraySorter(driversDistance).slice(0, threshold || 3);
    return closest.length < 1
      ? res.status(404).json({
          message: "No existen conductores cerca !!!",
          options: "Agregar parametro para aumentar la distancia a consultar",
        })
      : res.status(200).json(closest);
  }
}
