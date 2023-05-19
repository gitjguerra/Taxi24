import { Router } from "express";
import error from "../middlewares/errors";
import TripController from "../controllers/tripController";
import ModelValidator from "../middlewares/modelValidator";
import { validateTrip, validateId, validateGPS } from "../middlewares/validators";

const trip = Router();

trip.put("/trips/:id/complete", validateId, ModelValidator.validateTrip, error(TripController.completeTrip));

trip.post("/trips", validateTrip, validateGPS, ModelValidator.validateRider, ModelValidator.validateDriver, error(TripController.createTrip));

trip.get("/trips", error(TripController.getActiveTrips));

export default trip;
