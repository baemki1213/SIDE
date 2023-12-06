import bcrypt from "bcrypt";

export const compareHashedPassword = async (
  inputPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(inputPassword, hashedPassword);
};
