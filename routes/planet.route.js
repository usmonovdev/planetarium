const { Router } = require("express")
const router = Router()
const {getAllPlanets, getPlanetById, createPlanet, updatePlanet, deletePlanet} = require("../controllers/planet.controller")
const upload = require("../utils/fileUpload")

router.get("/", getAllPlanets)
router.get("/:id", getPlanetById)
router.post("/", upload.single("image"), createPlanet)
router.put("/:id", updatePlanet)
router.delete("/:id", deletePlanet)

module.exports = router