const joi = require("joi");
const customError = require("../utils/error");

const joiValidation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (!error) {
      next();
      return;
    }
    throw new customError(403, error.message);
  };
};

module.exports = joiValidation;
