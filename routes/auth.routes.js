const authController = require("../controllers/auth-controllers");
const joiValidation = require("../middleware/joi-validation");
const {
  registerSchemaValidation,
  loginSchemaValidation,
} = require("../validation/joiSchemaValidation");

const router = require("express").Router();

router.post(
  "/register",
  [joiValidation(registerSchemaValidation)],
  authController.registerUser
);
router.post(
  "/login",
  [joiValidation(loginSchemaValidation)],
  authController.loginUser
);

module.exports = router;
