import express, { Router } from "express";

import serviceController from "../controllers/serviceController";
import { authenticateAccessToken } from "../middlewares/auth";

const serviceRoutes: Router = express.Router();

serviceRoutes.get("/map/circle", serviceController.fetchStoresInCircle);
serviceRoutes.post(
  "/map/save-place-and-user",
  authenticateAccessToken,
  serviceController.saveSelection
);
serviceRoutes.get(
  "/map/userPlaces/:userId",
  authenticateAccessToken,
  serviceController.getUserPlaces
);

export default serviceRoutes;
