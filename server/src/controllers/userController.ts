const crypto = require("crypto");

import {
  hashPassword,
  isEmailRegistered,
  isNicknameTaken,
  registerUser,
  saveVerificationToken,
  updateEmailVerificationStatus,
  verifyToken,
} from "../models/user";

const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_PASS,
  },
});

const register = async (req, res) => {
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
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
};

const sendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const token = crypto.randomBytes(20).toString("hex");

    const tokenSaved = await saveVerificationToken(email, token);
    if (!tokenSaved) {
      return res
        .status(500)
        .json({ message: "Failed to save verification token" });
    }

    const mailOptions = {
      from: process.env.GOOGLE_USER,
      to: email,
      subject: "Email Verification",
      text: `Click the following link to verify your email: http://localhost:3000/api/user/verify-email?token=${token}`,
    };
    smtpTransport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Email send failed", error: error.toString() });
      }
      res.status(200).json({ message: "Email sent successfully", info });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, token } = req.body;
    const isTokenValid = await verifyToken(email, token);

    if (!isTokenValid) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification token" });
    }

    const isStatusUpdated = await updateEmailVerificationStatus(email);
    if (!isStatusUpdated) {
      return res
        .status(500)
        .json({ message: "Failed to update email verification status" });
    }

    // TODO: Any other post-verification actions 필요하면 하기.

    res.status(200).json({ message: "Email successfully verified" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
};

export { register, sendVerificationEmail, verifyEmail };
