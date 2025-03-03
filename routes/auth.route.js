const { Router } = require("express");
const router = Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
} = require("../controllers/auth.controller");
const { protected } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protected, getProfile);
router.put("/profile/update", protected, updateProfile);

module.exports = router;
