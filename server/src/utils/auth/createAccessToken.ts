const jwt = require("jsonwebtoken");

export const createAccessToken = async (userId: number) => {
  return jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};
