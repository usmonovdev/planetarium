const { Router } = require("express");
const router = Router();
const {
  getAllPlanets,
  getPlanetById,
  createPlanet,
  updatePlanet,
  deletePlanet,
} = require("../controllers/planet.controller");
const upload = require("../utils/fileUpload");
const { protected, adminAccess } = require("../middleware/auth");

router.get("/", getAllPlanets);
router.get("/:id", getPlanetById);
router.post("/", protected, adminAccess, upload.single("image"), createPlanet);
router.put("/:id", protected, adminAccess, updatePlanet);
router.delete("/:id", protected, adminAccess, deletePlanet);

module.exports = router;
