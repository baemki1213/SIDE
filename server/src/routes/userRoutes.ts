import express, { Router } from "express";
import userController from "../controllers/userController";

const userRouter: Router = express.Router();

userRouter.post("/register", userController.register);
userRouter.post(
  "/send-verification-email",
  userController.sendVerificationEmail
);
userRouter.post("/verify-email", userController.verifyEmail);

export default userRouter;
