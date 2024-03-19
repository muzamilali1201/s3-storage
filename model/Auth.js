const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Auth",
  mongoose.Schema({
    username: String,
    email: String,
    password: String,
  })
);
