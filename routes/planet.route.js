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
const { protected, adminAccess, apiKeyAccess } = require("../middleware/auth");

router.get("/", apiKeyAccess, getAllPlanets);
router.get("/:id", apiKeyAccess, getPlanetById);
router.post("/", protected, adminAccess, upload.single("image"), createPlanet);
router.put("/:id", protected, adminAccess, updatePlanet);
router.delete("/:id", protected, adminAccess, deletePlanet);

module.exports = router;
