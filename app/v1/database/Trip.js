import db from "./index";

export default class Trip {
  static async create(data) {
    const queryString = `INSERT INTO viajes (punto_inicio, punto_destino, estatus, pasajero_id, conductor_id) 
    VALUES ($1, $2, false, $3, $4) RETURNING *`;
    return await db.query(queryString, Object.values(data));
  }

  static async getAllActive() {
    const queryString = "SELECT * FROM viajes WHERE estatus=true";
    return await db.query(queryString);
  }

  static async updateTrip(id) {
    const queryString = "UPDATE viajes SET estatus=true WHERE id=$1 RETURNING *";
    return await db.query(queryString, [id]);
  }

  static async findByOne(id) {
    const queryString = "SELECT * FROM viajes WHERE id = $1";
    return await db.query(queryString, [id]);
  }
}
