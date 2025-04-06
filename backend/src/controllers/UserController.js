const { createUser } = require("../models/User");

const registerUser = (req, res) => {
  createUser(req.body, (err, userId) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "User created", userId });
  });
};

module.exports = { registerUser };
