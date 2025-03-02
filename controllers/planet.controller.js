const Planet = require("../models/planet.model");
const Star = require("../models/star.model");
const AsyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc        Get all planets
// @route       GET /api/v1/auth/planets
// @access      Public
exports.getAllPlanets = AsyncHandler(async (req, res, next) => {
  const planets = await Planet.find();

  res.status(200).json({
    success: true,
    data: planets,
  });
});

// @desc        Get planet by id
// @route       GET /api/v1/auth/planets/:id
// @access      Public
exports.getPlanetById = AsyncHandler(async (req, res, next) => {
  const planet = await Planet.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: planet,
  });
});

// @desc        Create planet
// @route       POST /api/v1/auth/planets
// @access      Private/Admin
exports.createPlanet = AsyncHandler(async (req, res, next) => {
  const {
    name,
    distanceToStar,
    diametr,
    yearDuration,
    dayDurtion,
    tempreature,
    sequenceNumber,
    satelittes,
    star,
  } = req.body;

  const findStar = await Star.findById(star);

  if (!findStar) {
    return next(new ErrorResponse("Star not found", 400));
  }

  const newPlanet = await Planet.create({
    name,
    distanceToStar,
    diametr,
    yearDuration,
    dayDurtion,
    tempreature,
    sequenceNumber,
    satelittes,
    image: "uploads/" + req.file.filename,
    star,
  });

  await Star.findOneAndUpdate(
    { _id: star },
    { $push: { planets: newPlanet._id } },
    { new: true, upsert: true }
  );

  res.status(201).json({
    success: true,
    data: newPlanet
  })
});