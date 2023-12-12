const jwt = require("jsonwebtoken");
import connection from "../config/db.config";

import {
  findRefreshTokenSQL,
  removeRefreshTokenSQL,
  saveRefreshTokensSQL,
} from "../sql/auth";

const createAndSaveRefreshToken = async (userId: number) => {
  const expiresAt = new Date();
  const token = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  expiresAt.setDate(expiresAt.getDate() + 7);
  (await connection).query(saveRefreshTokensSQL, [userId, token, expiresAt]);

  return token;
};

const findRefreshToken = async (token: string) => {
  const result: any = await (
    await connection
  ).query(findRefreshTokenSQL, [token]);

  return result[0];
};

const removeRefreshToken = async (token: string) => {
  return (await connection).query(removeRefreshTokenSQL, [token]);
};

export { createAndSaveRefreshToken, findRefreshToken, removeRefreshToken };
