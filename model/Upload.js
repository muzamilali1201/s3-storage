const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Upload",
  mongoose.Schema({
    userId: String,
    key: String,
  })
);
