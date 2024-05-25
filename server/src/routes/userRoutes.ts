import express, { Router } from "express";
import userController from "../controllers/userController";
import { authenticateAccessToken } from "../middlewares/auth";

const userRouter: Router = express.Router();

userRouter.post("/register", userController.register);
userRouter.post(
  "/send-verification-email",
  userController.sendVerificationEmail
);
userRouter.post("/verify-email", userController.verifyEmail);
userRouter.post("/check-nickname", userController.checkNickname);

userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get(
  "/user-info",
  authenticateAccessToken,
  userController.getUserInfo
);

userRouter.post("/request-reset-password", userController.requestResetPassword);

export default userRouter;
