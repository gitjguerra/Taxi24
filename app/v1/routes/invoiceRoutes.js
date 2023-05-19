import { Router } from "express";
import error from "../middlewares/errors";
import InvoiceController from "../controllers/invoiceController";
import ModelValidator from "../middlewares/modelValidator";
import { validateAmount } from "../middlewares/validators";

const invoice = Router();

invoice.get("/invoices", error(InvoiceController.getAllInvoices));

invoice.post("/invoice", ModelValidator.validateTrip, ModelValidator.validateRider, ModelValidator.validateDriver, validateAmount, validateAmount, error(InvoiceController.createInvoice));

export default invoice;
