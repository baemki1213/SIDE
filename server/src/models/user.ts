import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";
import moment from "moment";

import {
  countEmailSQL,
  countNicknameSQL,
  createUserSQL,
  verifyEmailByTokenSQL,
  saveVerificationTokenSQL,
} from "../sql/user";
import connection from "../config/db.config";

interface User extends RowDataPacket {
  count: number;
}

const isEmailRegistered = async (email: string): Promise<boolean> => {
  const [rows] = await (await connection).query<User[]>(countEmailSQL, [email]);
  return rows[0].count > 0;
};

const isNicknameTaken = async (nickname: string): Promise<boolean> => {
  const [rows] = await (
    await connection
  ).query<User[]>(countNicknameSQL, [nickname]);
  return rows[0].count > 0;
};

const registerUser = async ({
  email,
  password,
  nickname,
}: {
  email: string;
  password: string;
  nickname: string;
}): Promise<void> => {
  await (await connection).query(createUserSQL, [email, password, nickname]);
};

const saveVerificationToken = async (
  email: string,
  token: string
): Promise<boolean> => {
  const expiryAt = moment().add(1, "hours").toDate(); // 현재 시간으로부터 1시간 뒤

  const [result] = await (
    await connection
  ).query<any>(saveVerificationTokenSQL, [email, token, expiryAt]);
  return result.affectedRows === 1;
};

const verifyEmailByToken = async (token: string) => {
  const [result] = await (
    await connection
  ).query<any>(verifyEmailByTokenSQL, [token]);
  return result.affectedRows > 0;
};

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export {
  isEmailRegistered,
  isNicknameTaken,
  registerUser,
  saveVerificationToken,
  verifyEmailByToken,
  hashPassword,
  comparePassword,
};
