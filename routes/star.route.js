const { Router } = require("express")
const router = Router()
const {getAllStars, createStar, getStarById, updateStar, deleteStar} = require("../controllers/star.controller")
const upload = require("../utils/fileUpload")

router.get("/", getAllStars)
router.get("/:id", getStarById)
router.post("/", upload.single("image"), createStar)
router.put("/:id", updateStar)
router.delete("/:id", deleteStar)

module.exports = router