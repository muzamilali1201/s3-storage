const jwt = require("jsonwebtoken");
const customError = require("../utils/error");
const Auth = require("../model/Auth");

const tokenVerification = async (req, res, next) => {
  let header = req.header("Authorization");
  if (!header) {
    throw new customError(400, "User is not login yet");
  }
  let token = header.split(" ")[1];
  let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  let userExist = await Auth.findOne({
    _id: decodedToken._id,
  });
  if (!userExist) {
    throw new customError(404, "User not exists");
  }
  req.userData = decodedToken;
  next();
};

module.exports = tokenVerification;
