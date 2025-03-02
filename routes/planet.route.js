const { Router } = require("express")
const router = Router()
const {getAllPlanets, getPlanetById, createPlanet} = require("../controllers/planet.controller")
const upload = require("../utils/fileUpload")

router.get("/", getAllPlanets)
router.get("/:id", getPlanetById)
router.post("/", upload.single("image"), createPlanet)

module.exports = router