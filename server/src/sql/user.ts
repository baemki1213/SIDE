// register user
const countEmailSQL = "SELECT COUNT(*) AS count FROM users WHERE email = ?";

const countNicknameSQL =
  "SELECT COUNT(*) AS count FROM users WHERE nickname = ?";

const createUserSQL =
  "INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)";

// email verify
const saveVerificationTokenSQL =
  "INSERT INTO email_verifications (email, token, created_at, expiry_at) VALUES (?, ?, NOW(), ?) ON DUPLICATE KEY UPDATE token = VALUES(token), created_at = NOW(), expiry_at = VALUES(expiry_at)";

const verifyEmailByTokenSQL =
  "UPDATE email_verifications SET verified = TRUE WHERE email = ? AND token = ?";

const findCurrentEmailSQL =
  "SELECT expiry_at FROM email_verifications WHERE email = ? AND token = ?";

export {
  createUserSQL,
  countEmailSQL,
  countNicknameSQL,
  saveVerificationTokenSQL,
  verifyEmailByTokenSQL,
  findCurrentEmailSQL,
};
