const AsyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.protected = AsyncHandler(async (req, res, next) => {
  let token;
  // Get authorization credentials
  const authorization = req.headers.authorization;

  // set token to toke
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("No authorization credentials", 401));
  }

  // Decode JwtToken
  const decodeJwt = jwt.decode(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodeJwt.id);

  next();
});

exports.adminAccess = (req, res, next) => {
  if (!req.user.adminStatus) {
    return next(new ErrorResponse("Only admins can access this route", 403));
  }
  next();
};

exports.apiKeyAccess = AsyncHandler(async (req, res, next) => {
  let key;

  // Get headers
  if (req.headers.apikey) {
    key = req.headers.apikey;
  }

  // If api key not found
  if (!key) {
    return next(new ErrorResponse("No API Key to access this route", 400));
  }

  // Find user by api key
  const user = await User.findOne({ apiKey: key });

  // If user not found
  if (!user) {
    return next(new ErrorResponse("No user found by this Api Key", 400));
  }

  if (!user.isActive) {
    return next(
      new ErrorResponse("Please activate your status to get this response", 403)
    );
  }

  next();
});
