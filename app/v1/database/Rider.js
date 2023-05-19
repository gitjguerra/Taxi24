import db from "./index";

export default class Rider {
  static async getAll() {
    const queryString = "SELECT * FROM pasajeros";
    return await db.query(queryString);
  }
  static async findByOne(id) {
    const queryString = "SELECT * FROM pasajeros WHERE id = $1";
    return await db.query(queryString, [id]);
  }
}
