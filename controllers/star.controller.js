const Star = require("../models/star.model");
const AsyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc        Get all stars
// @route       GET /api/v1/auth/stars
// @access      Public
exports.getAllStars = AsyncHandler(async (req, res, next) => {
  const stars = await Star.find();

  res.status(200).json({
    success: true,
    data: stars,
  });
});

// @desc        Get start by id
// @route       GET /api/v1/auth/stars/:id
// @access      Public
exports.getStarById = AsyncHandler(async (req, res, next) => {
  const star = await Star.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: star,
  });
});

// @desc        Create star
// @route       POST /api/v1/auth/stars
// @access      Private/Admin
exports.createStar = AsyncHandler(async (req, res, next) => {
  const { name, tempreature, massa, diametr, image } = req.body;

  const star = await Star.create({
    name,
    tempreature,
    massa,
    diametr,
    image,
  });

  res.status(201).json({
    success: true,
    data: star,
  });
});

// @desc        Update star by id
// @route       PUT /api/v1/auth/stars/:id
// @access      Private/Admin
exports.updateStar = AsyncHandler(async (req, res, next) => {
  const { name, tempreature, massa, diametr, image } = req.body;

  const findStar = await Star.findById(req.params.id);

  // if (!findStar) {
  //   return next(new ErrorResponse("Star not found", 404))
  // }

  const editedStar = {
    name: name || findStar.name,
    tempreature: tempreature || findStar.tempreature,
    massa: massa || findStar.massa,
    diametr: diametr || findStar.diametr,
  };

  const star = await Star.findByIdAndUpdate(req.params.id, editedStar, {
    new: true,
  });

  res.status(201).json({
    success: true,
    data: star,
  });
});

// @desc        Delete star by id
// @route       DELETE /api/v1/auth/stars/:id
// @access      Private/Admin
exports.deleteStar = AsyncHandler(async (req, res, next) => {
  await Star.findByIdAndDelete(req.params.id);

  res.status(201).json({
    success: true,
    message: "Deleted successfully",
  });
});
