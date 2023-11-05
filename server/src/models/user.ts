import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";
import moment from "moment";

import {
  countEmailSQL,
  countNicknameSQL,
  createUserSQL,
  verifyEmailByCodeSQL,
  saveVerificationCodeSQL,
  findCurrentEmailSQL,
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

const saveVerificationCode = async (
  email: string,
  code: number
): Promise<boolean> => {
  const expiryAt = moment().add(1, "minutes").toDate();

  const [result] = await (
    await connection
  ).query<any>(saveVerificationCodeSQL, [email, code, expiryAt]);
  return result.affectedRows > 0;
};

const verifyEmailByCode = async (email: string, code: number) => {
  const [result] = await (
    await connection
  ).query<any>(verifyEmailByCodeSQL, [email, code]);
  return result.affectedRows > 0;
};

const findCurrentEmail = async (email: string, code: number) => {
  const [result] = await (
    await connection
  ).query<any>(findCurrentEmailSQL, [email, code]);
  return result[0];
};

const isCodeExpired = (expiryAt: string) => {
  return moment(expiryAt).isBefore(moment());
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
  isCodeExpired,
  findCurrentEmail,
  registerUser,
  saveVerificationCode,
  verifyEmailByCode,
  hashPassword,
  comparePassword,
};
