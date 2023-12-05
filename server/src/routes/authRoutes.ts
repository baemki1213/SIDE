import express, { Router } from "express";
import authController from "../controllers/authController";

const authRoutes: Router = express.Router();

authRoutes.post("/token/refresh", authController.issueAccessToken);

export default authRoutes;
