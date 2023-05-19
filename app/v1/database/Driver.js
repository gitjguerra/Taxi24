import db from "./index";

export default class Driver {
  static async getAll() {
    const queryString = "SELECT * FROM conductores";
    return await db.query(queryString);
  }

  static async getAvailableDrivers() {
    const queryString = "SELECT * FROM conductores WHERE disponible=true";
    return await db.query(queryString);
  }

  static async findByOne(id) {
    const queryString = "SELECT * FROM conductores WHERE id = $1";
    return await db.query(queryString, [id]);
  }

  static async updateDriver(disponible, id) {
    const queryString =
      "UPDATE conductores SET disponible=$1 WHERE id=$2 RETURNING *";
    return await db.query(queryString, [disponible, id]);
  }
}
