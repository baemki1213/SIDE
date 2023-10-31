import crypto from "crypto";
import nodemailer from "nodemailer";
import {
  verifyEmailByToken,
  hashPassword,
  isEmailRegistered,
  isNicknameTaken,
  registerUser,
  saveVerificationToken,
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
      const { email } = req.body;
      const token = crypto.randomBytes(32).toString("hex");

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

  async verifyEmail(req: { body: { code: string } }, res: any) {
    const { code } = req.body;

    try {
      const isVerified = await verifyEmailByToken(code);

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
