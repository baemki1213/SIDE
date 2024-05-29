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
  findUserByEmailSQL,
  findUserByIdSQL,
  updateUserSQL,
  deleteUserByIdSQL,
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
  hashed_password,
  nickname,
}: {
  email: string;
  hashed_password: string;
  nickname: string;
}): Promise<void> => {
  await (
    await connection
  ).query(createUserSQL, [email, hashed_password, nickname]);
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
const findUserByEmail = async (email: string) => {
  const [result] = await (
    await connection
  ).query<any>(findUserByEmailSQL, [email]);
  return result[0];
};
const findUserById = async (id: number): Promise<User | null> => {
  const [result] = await (await connection).query<any>(findUserByIdSQL, [id]);
  return result[0];
};

const patchUserById = async (id: number, patchData: any) => {
  const fields = Object.keys(patchData);
  const values = Object.values(patchData);

  if (fields.length === 0) {
    throw new Error("업데이트할 데이터가 없습니다.");
  }

  const sql = updateUserSQL(fields);
  const [result] = await (await connection).query<any>(sql, [...values, id]);

  return result.affectedRows > 0;
};

const deleteUserById = async (id: number): Promise<boolean> => {
  const [result] = await (await connection).query<any>(deleteUserByIdSQL, [id]);
  return result.affectedRows > 0;
};

export const deleteRefreshTokensByUserId = async (userId: number) => {
  const deleteTokensSQL = `DELETE FROM refreshtokens WHERE userId = ?`;
  const [result] = await (await connection).query(deleteTokensSQL, [userId]);
  return result;
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
  findUserByEmail,
  findUserById,
  patchUserById,
  deleteUserById,
};
