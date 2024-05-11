import express, { Router } from "express";

import serviceController from "../controllers/serviceController";

const serviceRoutes: Router = express.Router();

serviceRoutes.get("/map/circle", serviceController.fetchStoresInCircle);

export default serviceRoutes;
