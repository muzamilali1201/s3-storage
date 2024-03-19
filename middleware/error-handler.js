const customError = require("../utils/error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof customError) {
    res.status(err.status).json({
      success: false,
      error: {
        status: err.status,
        message: err.message,
      },
    });
  } else {
    res.status(500).json({
      success: false,
      error: {
        status: err.status,
        message: err.message,
      },
    });
  }
};

module.exports = errorHandler;
