const bcrypt = require("bcrypt");

const userConnection = require("../config/db.config.ts");

const registerApi = async (req, res) => {
  const sql = `insert into user set ?`;
  const body = req.body;

  let currentPassword = body?.user_password || "";
  const encryptedPW = bcrypt.hashSync(currentPassword, 10);

  const params = {
    user_id: body.user_id,
    user_password: encryptedPW,
    user_name: body.user_name,
    user_email: body.user_email,
  };

  userConnection.query(sql, params, (err, rows, fields) => {
    if (err) {
      res.status(400).send({ msg: "error", content: err });
    } else {
      res.status(200).send({ msg: "success", params });
    }
  });
};

module.exports = { registerApi };
