const bcrypt = require("bcrypt");
const userConnection = require("../config/db.config.ts");

const registerApi = async (req, res) => {
  try {
    const { email, password, nickname } = req.body;

    const encryptedPW = bcrypt.hashSync(password, 10);

    const params = {
      user_id: email,
      user_password: encryptedPW,
      user_nickname: nickname,
      user_email: email,
    };

    const isDuplicate = await checkEmailDuplicate(email);
    if (isDuplicate) {
      return res.status(400).send({ msg: "Email duplicated" });
    }

    await registerUser(params);
    return res.status(200).send({ msg: "success", params });
  } catch (error) {
    return res.status(400).send({ msg: "server error", content: error });
  }
};

const checkEmailDuplicate = email => {
  const checkSql = `SELECT * FROM users WHERE user_email = ?`;
  return new Promise((resolve, reject) => {
    userConnection.query(checkSql, [email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length > 0);
      }
    });
  });
};

const registerUser = params => {
  const registerUserSql = `INSERT INTO users SET ?`;
  return new Promise((resolve, reject) => {
    userConnection.query(registerUserSql, params, (err, rows, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(null);
      }
    });
  });
};

module.exports = { registerApi };
