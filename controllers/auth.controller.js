const User = require("../models/user.model");
const uuid = require("uuid");
const AsyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc        Regsiter user
// @route       POST /api/v1/auth/register
// @access      Public
exports.register = AsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const apiKey = uuid.v4();

  const user = await User.create({
    name: name,
    email: email,
    password: password,
    apiKey: apiKey,
  });

  const token = user.generateJwtToken();

  res.status(201).json({
    success: true,
    data: user,
    token,
  });
});

// @desc        Login user
// @route       POST /api/v1/auth/login
// @access      Public
exports.login = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please enter email and password", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const isPasswordMatch = await user.matchPassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const token = user.generateJwtToken();

  res.status(200).json({
    success: true,
    data: user,
    token,
  });
});
