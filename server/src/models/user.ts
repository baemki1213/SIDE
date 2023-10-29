const bcrypt = require("bcrypt");

import {
  countEmailSQL,
  countNicknameSQL,
  createUserSQL,
  saveVerificationTokenSQL,
  updateEmailVerificationStatusSQL,
  verifyTokenSQL,
} from "../sql/user";

const isEmailRegistered = async (email: string) => {
  // email을 count 하고 등록되어있는지 아닌지 boolean 리턴
  const [rows] = await connection.query(countEmailSQL, [email]);
  return rows[0].count > 0;
};

const isNicknameTaken = async (nickname: string) => {
  const [rows] = await connection.query(countNicknameSQL, [nickname]);
  return rows[0].count > 0;
};

const registerUser = async ({ email, password, nickname }) => {
  await connection.query(createUserSQL, [email, password, nickname]);
};

const saveVerificationToken = async (email, token) => {
  const [rows] = await connection.query(saveVerificationTokenSQL, [
    email,
    token,
  ]);
  return rows.affectedRows === 1;
};

const verifyToken = async (email, token) => {
  const [rows] = await connection.query(verifyTokenSQL, [email, token]);
  return rows.length > 0;
};

const updateEmailVerificationStatus = async (email: string) => {
  const [rows] = await connection.query(updateEmailVerificationStatusSQL, [
    true,
    email,
  ]);
  return rows.affectedRows === 1;
};

const hashPassword = async (password: string) => {
  const saltRounds = 10; // 비밀번호를 암호화할 때 사용할 salt의 라운드 수
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export {
  isEmailRegistered,
  isNicknameTaken,
  registerUser,
  saveVerificationToken,
  verifyToken,
  updateEmailVerificationStatus,
  hashPassword,
  comparePassword,
};
