const express = require("express");
require("dotenv").config();
require("express-async-errors");
const dbConnection = require("./config/dbConnection");
const routes = require("./routes/routes");
const errorHandler = require("./middleware/error-handler");

const app = express();
app.use(express.json());
app.use("/api/v1", routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  dbConnection();
  console.log(`Server is running at ${PORT}`);
});
