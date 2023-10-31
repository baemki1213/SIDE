import { randomInt } from "crypto";
import nodemailer from "nodemailer";
import {
  verifyEmailByToken,
  hashPassword,
  isEmailRegistered,
  isNicknameTaken,
  registerUser,
  saveVerificationToken,
  isTokenExpired,
  findCurrentEmail,
} from "../models/user";

const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_PASS,
  },
});

const userController = {
  async register(req: any, res: any) {
    try {
      const { email, password, nickname } = req.body;

      const emailExists = await isEmailRegistered(email);
      if (emailExists)
        return res.status(409).json({ message: "Email already registered." });

      const nicknameExists = await isNicknameTaken(nickname);
      if (nicknameExists)
        return res.status(409).json({ message: "Nickname already in use." });

      const hashedPassword = await hashPassword(password);

      const userId = await registerUser({
        email,
        password: hashedPassword,
        nickname,
      });
      res.status(201).json({ message: "Registration successful", userId });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Server error", error: error.toString() });
    }
  },

  async sendVerificationEmail(req: any, res: any) {
    try {
      // verified된 것 중에 이메일이 존재하는 경우에는 중복된 이메일 에러 전송.
      const { email } = req.body;
      const isRegistered = await isEmailRegistered(email);
      if (isRegistered) {
        return res
          .status(400)
          .json({ message: "Verified email already registered." });
      }
      const token = randomInt(100000, 1000000);

      const tokenSaved = await saveVerificationToken(email, token);
      if (!tokenSaved)
        return res
          .status(500)
          .json({ message: "Failed to save verification token" });

      const mailOptions = {
        from: process.env.GOOGLE_USER,
        to: email,
        subject: "Email Verification",
        text: `Copy and paste the code ${token}`,
      };

      smtpTransport.sendMail(mailOptions, (error: any, info: any) => {
        if (error)
          return res
            .status(500)
            .json({ message: "Email send failed", error: error.toString() });
        res.status(200).json({ message: "Email sent successfully", info });
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Server error", error: error.toString() });
    }
  },

  async verifyEmail(req: { body: { email: string; code: number } }, res: any) {
    const { email, code } = req.body;

    try {
      const currentEmail = await findCurrentEmail(email, code);
      const isExpired = isTokenExpired(currentEmail?.expiry_at);
      if (isExpired) {
        return res.status(400).send("Expired token");
      }
      const isVerified = await verifyEmailByToken(email, code);

      if (!isVerified) {
        return res.status(400).send("Invalid token");
      }
      res.status(200).send("Email verified successfully!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  },
};

export default userController;
