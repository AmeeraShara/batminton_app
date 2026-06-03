const db = require("../config/db");

const createUser = (user, callback) => {
  const sql =
    "INSERT INTO users(full_name,mobile,email,password) VALUES(?,?,?,?)";

  db.query(
    sql,
    [user.full_name, user.mobile, user.email, user.password],
    callback,
  );
};

module.exports = {
  createUser,
};
