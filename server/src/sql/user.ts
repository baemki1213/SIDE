// register user
const countEmailSQL = "SELECT COUNT(*) AS count FROM users WHERE email = ?";

const countNicknameSQL =
  "SELECT COUNT(*) AS count FROM users WHERE nickname = ?";

const createUserSQL =
  "INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)";

// email verify
const saveVerificationCodeSQL =
  "INSERT INTO email_verifications (email, code, created_at, expiry_at) VALUES (?, ?, NOW(), ?) ON DUPLICATE KEY UPDATE code = VALUES(code), created_at = NOW(), expiry_at = VALUES(expiry_at)";

const verifyEmailByCodeSQL =
  "UPDATE email_verifications SET verified = TRUE WHERE email = ? AND code = ?";

const findCurrentEmailSQL =
  "SELECT expiry_at FROM email_verifications WHERE email = ? AND code = ?";

export {
  createUserSQL,
  countEmailSQL,
  countNicknameSQL,
  saveVerificationCodeSQL,
  verifyEmailByCodeSQL,
  findCurrentEmailSQL,
};
