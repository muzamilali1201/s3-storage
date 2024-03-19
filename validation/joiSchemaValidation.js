const joi = require("joi");

const registerSchemaValidation = joi.object({
  username: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(4).max(8).required(),
});

const loginSchemaValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

module.exports = { registerSchemaValidation, loginSchemaValidation };
