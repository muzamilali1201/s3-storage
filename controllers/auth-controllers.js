const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Auth = require("../model/Auth");
const customError = require("../utils/error");

const authController = {
  // Controller function to register a new user
  registerUser: async (req, res) => {
    const { username, email, password } = req.body;

    // Checking if the email already exists in the database
    const existingEmail = await Auth.findOne({ email });

    // Hashing the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // If the email already exists, throw an error
    if (existingEmail) {
      throw new Error(409, "User already exists. Please login.");
    }
    let newUser = await Auth.create({
      username,
      email,
      password: hashedPassword,
    });

    // Removing the password from the user object before sending the response
    newUser = newUser.toObject();
    delete newUser.password;

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  },

  // Controller function to log in an existing user
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    // Finding the user with the provided email
    let foundUser = await Auth.findOne({ email });

    // If no user is found with the provided email, throw an error
    if (!foundUser) {
      throw new Error(404, "User does not exist. Please register first.");
    }

    // Comparing the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
      throw new Error(401, "Invalid credentials");
    }

    // Removing the password from the user object before sending the response
    foundUser = foundUser.toObject();
    delete foundUser.password;

    // Generating JWT token for the user
    const token = jwt.sign(foundUser, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      data: foundUser,
    });
  },
};

module.exports = authController;
