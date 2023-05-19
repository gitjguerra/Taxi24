import { Router } from "express";
import error from "../middlewares/errors";
import DriverController from "../controllers/driverController";
import { validateMyLocation, validateGPS } from "../middlewares/validators";

const driver = Router();

driver.get("/drivers", error(DriverController.getAllDrivers));

driver.get("/drivers/available", error(DriverController.getAvailableDrivers));

driver.get("/drivers/available/range", validateMyLocation, validateGPS, error(DriverController.getAvailableDriversWithInRange));

driver.get("/drivers/:id", error(DriverController.findDriverById));

export default driver;
