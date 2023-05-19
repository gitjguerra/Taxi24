import { Router } from "express";
import error from "../middlewares/errors";
import RiderControllers from "../controllers/riderController";
import { validateId, validateMyLocation, validateGPS } from "../middlewares/validators";

const rider = Router();

rider.get("/riders/closest", validateMyLocation, validateGPS, error(RiderControllers.getClosestDrivers));

rider.get( "/riders/:id", validateId, error(RiderControllers.getRiderById));

rider.get("/riders", error(RiderControllers.getAllRiders));

export default rider;
