const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { signupSchema } = require("../validation/userValiadtion");
const { signup, login } = require("../controllers/authController");

router.post("/signup", validate(signupSchema), signup);
router.post('/login', validate(signupSchema), login)

module.exports = router;
