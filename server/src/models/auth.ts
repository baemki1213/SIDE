const jwt = require("jsonwebtoken");
import bcrypt from "bcrypt";

import connection from "../config/db.config";

import { saveRefreshTokensSQL } from "../sql/auth";

const compareHashedPassword = async (
  inputPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(inputPassword, hashedPassword);
};

const createAccessToken = async (userId: number) => {
  return jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};
const createAndSaveRefreshToken = async (userId: number) => {
  const expiresAt = new Date();
  const token = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  expiresAt.setDate(expiresAt.getDate() + 7);
  (await connection).query(saveRefreshTokensSQL, [userId, token, expiresAt]);

  return token;
};

export { compareHashedPassword, createAccessToken, createAndSaveRefreshToken };
