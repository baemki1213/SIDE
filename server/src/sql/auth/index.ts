const saveRefreshTokensSQL =
  "INSERT INTO refreshTokens (userId, token, expiresAt, createdAt) VALUES (?, ?, ?, NOW())";

const findRefreshTokenSQL = "SELECT * FROM refreshTokens WHERE token = ?";

const removeRefreshTokenSQL = "DELETE FROM refreshTokens WHERE token = ?";

export { saveRefreshTokensSQL, findRefreshTokenSQL, removeRefreshTokenSQL };
