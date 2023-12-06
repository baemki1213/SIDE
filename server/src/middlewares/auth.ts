import { Request } from "../types/Express";
import { Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");

export const authenticateAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (accessToken == null)
    return res.status(401).send("액세스 토큰이 존재하지 않습니다.");

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err: any, user: any) => {
      if (err) return res.status(403).send("유효하지 않은 액세스 토큰"); // 유효하지 않은 토큰
      req.user = user;
      next();
    }
  );
};
