import Invoice from "../database/Invoice";

const COSTOKM = 700;

export default class InvoiceController {
  static async getAllInvoices(req, res) {
    const { rows } = await Invoice.getAll();
    return rows.length < 1
      ? res.status(404).json({message: "No existen facturas en la base de datos !!!",}) : res.status(200).json(rows);
  }

  static async createInvoice(req, res) {
    const { invoices } = req;
    const invoice = await Invoice.create({
      tripId: id,
      riderId: invoices.pasajero_id,
      driverId: invoices.conductor_id,
      cost: distance * COSTOKM + (distance * COSTOKM * 0.1),
      impuesto: cost * 0.1
    });    
    if (invoice) {
      res.status(200).json({message: "Factura creada con exito !!!"});
    } else {
      res.status(500).json({message: "No fue posible agregar la factura en la base de datos !!!"});
    }
  }

}
