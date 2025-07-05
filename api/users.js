const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { signupSchema, reSendSchema } = require("../validation/userValiadtion");
const {
  signup,
  login,
  logout,
  current,
  verification,
  reVerification,
} = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");
const { upload } = require("../middleware/upload");
const { changeAvatar } = require("../controllers/userAvatar");

router.post("/signup", validate(signupSchema), signup);

router.get("/logout", auth, logout);
router.get("/current", auth, current);
router.patch("/avatars", auth, upload.single("avatar"), changeAvatar);
router.get("/verify/:verificationToken", verification);
router.post("/login", validate(signupSchema), login);
router.post("/verify", validate(reSendSchema), reVerification);

module.exports = router;
