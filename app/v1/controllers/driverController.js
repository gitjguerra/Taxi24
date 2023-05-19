import Driver from "../database/Driver";
import { calculateDistance } from "../helpers/helpers";

export default class DriverController {
  
  static async getAllDrivers(req, res) {
    const { rows } = await Driver.getAll();
    return rows.length < 1
      ? res.status(404).json({
          message: "No se encontraron conductores",
        })
      : res.status(200).json(rows);
  }

  static async getAvailableDrivers(req, res) {
    const { rows } = await Driver.getAvailableDrivers();
    return rows.length < 1
      ? res.status(404).json({ message: "No existen conductores disponibles por el momento" })
      : res.status(200).json(rows);
  }

  static async getAvailableDriversWithInRange(req, res) {
    const { rows } = await Driver.getAvailableDrivers();
    const { myLocation, range } = req.query;
    const ridersLocation = myLocation.split(",");
    let DriversWithInRange = [];
    rows.forEach((Driver) => {
      const location = Driver.location.split(",");
      const distance = calculateDistance(
        location[0],
        location[1],
        ridersLocation[0],
        ridersLocation[1]
      );
      if (distance <= (range || 3)) {
        DriversWithInRange.push({ Driver, DriverRange: `${distance} KM` });
      }
    });
    return DriversWithInRange.length < 1
      ? res.status(200).json({
          message: "No hay conductores cercanos a 3 KM",
          options: "<distancia> parámetro de consulta para aumentar la distancia",
        })
      : res.status(200).json(DriversWithInRange);
  }
  
  static async findDriverById(req, res) {
    const { id } = req.params;
    const { rows } = await Driver.findByOne(id);
    if (!rows[0]) {
      return res.status(404).send({ message: "Driver no existe en la base de datos" });
    }
    return res.status(200).json(rows[0]);
  }
}
