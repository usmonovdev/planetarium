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

// @desc        Get my profile
// @route       GET /api/v1/auth/profile
// @access      Private
exports.getProfile = AsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc        Update my profile
// @route       PUT /api/v1/auth/profile/update
// @access      Private
exports.updateProfile = AsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const { name, email } = req.body;

  const fieldsToUpdate = {
    name: name || user.name,
    email: email || user.email,
  };

  const userUpdated = await User.findByIdAndUpdate(
    req.user._id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: userUpdated,
  });
});

// @desc        Update password
// @route       PUT /api/v1/auth/profile/update/password
// @access      Private
exports.updatePassword = AsyncHandler(async (req, res, next) => {
  // Find user
  const user = await User.findById(req.user._id);
  const { oldPassword, newPassword } = req.body;

  // Check old password
  if (!(await user.matchPassword(oldPassword))) {
    return next(new ErrorResponse("Old password is incorrect", 400));
  }

  // Update password and save
  user.password = newPassword;
  await user.save();

  // Generate new token for user
  const token = user.generateJwtToken();

  res.status(200).json({
    success: true,
    message: "Password updated and new JwtToken generated",
    data: user,
    token,
  });
});

// @desc        Payment Balance
// @route       POST /api/v1/auth/profile/payment/balance
// @access      Private
exports.paymentBalance = AsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id)

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { balance: (user.balance + req.body.payment) },
    {
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updatedUser,
  });
});

// @desc        Activate profile
// @route       GET /api/v1/auth/profile/activate
// @access      Private
exports.activateProfile = AsyncHandler(async (req, res, next) => {
  const apiCost = process.env.API_COST;

  const user = await User.findById(req.user._id);

  if (user.balance < apiCost) {
    const needMore = apiCost - user.balance;
    return next(
      new ErrorResponse(
        `Your balance less than ${apiCost}. You need ${needMore}`
      )
    );
  }

  await User.findByIdAndUpdate(
    req.user._id,
    { balance: user.balance - apiCost, isActive: true },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Your profile activated",
  });
});
