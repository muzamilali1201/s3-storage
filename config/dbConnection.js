const mongoose = require("mongoose");

const dbConnection = async () => {
  await mongoose.connect(process.env.DB_URL);
};
module.exports = dbConnection;
