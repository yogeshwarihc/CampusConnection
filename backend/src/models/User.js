const db = require("../config/database");

const createUser = (user, callback) => {
  const { name, email, password } = user;
  db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    function (err) {
      callback(err, this?.lastID);
    }
  );
};

module.exports = { createUser };
