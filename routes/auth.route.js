const { Router } = require("express");
const router = Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  updatePassword,
  paymentBalance,
  activateProfile,
} = require("../controllers/auth.controller");
const { protected } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protected, getProfile);
router.put("/profile/update", protected, updateProfile);
router.put("/profile/update/password", protected, updatePassword);
router.post("/profile/payment/balance", protected, paymentBalance);
router.get("/profile/activate", protected, activateProfile);

module.exports = router;
