const User = require("../models/user.model");
const uuid = require("uuid");
const AsyncHandler = require("../middleware/async");

exports.register = AsyncHandler(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const apiKey = uuid.v4();

    const user = await User.create({
      name: name,
      email: email,
      password: password,
      apiKey: apiKey,
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
