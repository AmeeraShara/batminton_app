const db = require("../config/db");

const createUser = (user, callback) => {
  const sql =
    "INSERT INTO management_team(name, role, email, mobile, password) VALUES(?,?,?,?,?)";

  db.query(
    sql,
    [user.name, user.role, user.email, user.mobile, user.password],
    callback,
  );
};

// LOGIN: email OR mobile
const findUserByEmailOrMobile = (identifier, callback) => {
  const sql = "SELECT * FROM management_team WHERE email = ? OR mobile = ?";

  db.query(sql, [identifier, identifier], callback);
};

module.exports = {
  createUser,
  findUserByEmailOrMobile,
};
