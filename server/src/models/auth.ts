const jwt = require("jsonwebtoken");
import bcrypt from "bcrypt";

import connection from "../config/db.config";

import { findRefreshTokenSQL, saveRefreshTokensSQL } from "../sql/auth";

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

const authenticateAccessToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (accessToken == null)
    return res.status(401).send("액세스 토큰이 존재하지 않습니다.");

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err: any, user: any) => {
      if (err) return res.status(403).send("유효하지 않은 액세스 토큰"); // 유효하지 않은 토큰
      console.log(req, req.user);
      req.user = user;
      next();
    }
  );
};

const findRefreshToken = async (token: string) => {
  const result: any = await (
    await connection
  ).query(findRefreshTokenSQL, [token]);

  return result[0];
};

export {
  compareHashedPassword,
  createAccessToken,
  createAndSaveRefreshToken,
  authenticateAccessToken,
  findRefreshToken,
};
