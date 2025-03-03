const { Router } = require("express");
const router = Router();
const {
  getAllStars,
  createStar,
  getStarById,
  updateStar,
  deleteStar,
} = require("../controllers/star.controller");
const upload = require("../utils/fileUpload");
const { protected, adminAccess, apiKeyAccess } = require("../middleware/auth");

router.get("/", apiKeyAccess, getAllStars);
router.get("/:id", apiKeyAccess, getStarById);
router.post("/", protected, adminAccess, upload.single("image"), createStar);
router.put("/:id", protected, adminAccess, updateStar);
router.delete("/:id", protected, adminAccess, deleteStar);

module.exports = router;
