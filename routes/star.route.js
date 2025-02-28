const { Router } = require("express")
const router = Router()
const {getAllStars, createStar, getStarById, updateStar, deleteStar} = require("../controllers/star.controller")

router.get("/", getAllStars)
router.get("/:id", getStarById)
router.post("/", createStar)
router.put("/:id", updateStar)
router.delete("/:id", deleteStar)

module.exports = router