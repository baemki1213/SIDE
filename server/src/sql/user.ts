// register user
const countEmailSQL = "SELECT COUNT(*) AS count FROM user WHERE email = ?";

const countNicknameSQL =
  "SELECT COUNT(*) AS count FROM user WHERE nickname = ?";

const createUserSQL =
  "INSERT INTO user (email, password, nickname) VALUES (?, ?, ?)";

// email verify
const saveVerificationTokenSQL =
  "INSERT INTO email_verifications (email, token, created_at, expiry_at) VALUES (?, ?, NOW(), ?) ON DUPLICATE KEY UPDATE token = VALUES(token)";

const verifyEmailByTokenSQL =
  "UPDATE email_verifications SET verified = TRUE WHERE token = ?";

export {
  createUserSQL,
  countEmailSQL,
  countNicknameSQL,
  saveVerificationTokenSQL,
  verifyEmailByTokenSQL,
};
