const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { signupSchema } = require("../validation/userValiadtion");
const {
  signup,
  login,
  logout,
  current,
} = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(signupSchema), login);
router.get("/logout", auth, logout);
router.get("/current", auth, current);
router.patch('/avatars', auth, upload.single("avatar"), changeAvatar)

module.exports = router;
