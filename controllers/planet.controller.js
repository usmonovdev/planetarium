const Planet = require("../models/planet.model");
const Star = require("../models/star.model");
const AsyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc        Get all planets
// @route       GET /api/v1/auth/planets
// @access      Public
exports.getAllPlanets = AsyncHandler(async (req, res, next) => {
  const defaultPageLimit = process.env.DEFAULT_PAGE_LIMIT || 5;
  const limit = parseInt(req.query.limit || defaultPageLimit);
  const page = parseInt(req.query.page || 1);
  const total = await Planet.countDocuments();

  const planets = await Planet.find()
    .skip(page * limit - limit)
    .limit(limit);

  res.status(200).json({
    success: true,
    pagination: {
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      nextPage: Math.ceil(total / limit) < page + 1 ? null : page + 1,
      limit,
    },
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
    data: newPlanet,
  });
});

// @desc        Update planet
// @route       PUT /api/v1/auth/planets/:id
// @access      Private/Admin
exports.updatePlanet = AsyncHandler(async (req, res, next) => {
  // Get request data
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

  // Find updating planet
  const findPlanet = await Planet.findById(req.params.id);

  // If planet not found
  if (!findPlanet) {
    return next(new ErrorResponse("Planet not found", 400));
  }

  const updatePlanet = {
    name: name || findPlanet.name,
    distanceToStar: distanceToStar || findPlanet.distanceToStar,
    diametr: diametr || findPlanet.diametr,
    yearDuration: yearDuration || findPlanet.yearDuration,
    dayDurtion: dayDurtion || findPlanet.dayDurtion,
    tempreature: tempreature || findPlanet.tempreature,
    sequenceNumber: sequenceNumber || findPlanet.sequenceNumber,
    satelittes: satelittes || findPlanet.satelittes,
    star: star || findPlanet.star,
  };

  const planet = await Planet.findByIdAndUpdate(req.params.id, updatePlanet, {
    new: true,
  });

  // If user want update also star
  if (star) {
    const findStar = await Star.findById(star);

    // Update planet star
    await Star.findOneAndUpdate(
      { _id: star },
      { $push: { planets: planet._id } },
      { new: true, upsert: true }
    );

    // else star not founded
    if (!findStar) {
      return next(new ErrorResponse("Star not found", 400));
    }
  }

  res.status(201).json({
    success: true,
    data: planet,
  });
});

// @desc        Delete planet by id
// @route       DELETE /api/v1/auth/planets/:id
// @access      Private/Admin
exports.deletePlanet = AsyncHandler(async (req, res, next) => {
  await Planet.findByIdAndDelete(req.params.id);

  res.status(201).json({
    success: true,
    message: "Deleted successfully",
  });
});
