const countEmailSQL = "SELECT COUNT(*) AS count FROM users WHERE email = ?";

const countNicknameSQL =
  "SELECT COUNT(*) AS count FROM users WHERE nickname = ?";

const createUserSQL =
  "INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)";

const saveVerificationTokenSQL =
  "INSERT INTO email_verifications (email, token) VALUES (?, ?)";

const verifyTokenSQL =
  "SELECT * FROM email_verifications WHERE email = ? AND token = ?";

const updateEmailVerificationStatusSQL =
  "UPDATE users SET is_email_verified = ? WHERE email = ?";

export {
  createUserSQL,
  countEmailSQL,
  countNicknameSQL,
  saveVerificationTokenSQL,
  verifyTokenSQL,
  updateEmailVerificationStatusSQL,
};
