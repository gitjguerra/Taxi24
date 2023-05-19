import db from "./index";

export default class Invoice {
  static async create(data) {
    const queryString = `INSERT INTO facturas(viaje_id, pasajero_id, conductor_id, monto, impuesto) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            console.log(queryString);
    return await db.query(queryString, Object.values(data));
  }
  
  static async getAll() {
    const queryString = `SELECT * FROM facturas`;
    return await db.query(queryString);
  }
  
}
