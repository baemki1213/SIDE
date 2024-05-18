import express, { Router } from "express";

import serviceController from "../controllers/serviceController";

const serviceRoutes: Router = express.Router();

serviceRoutes.get("/map/circle", serviceController.fetchStoresInCircle);
serviceRoutes.post("/map/save-place-and-user", serviceController.saveSelection);
serviceRoutes.get("/userPlaces/:userId", serviceController.getUserPlaces);

export default serviceRoutes;
