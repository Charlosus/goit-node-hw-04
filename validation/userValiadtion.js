const Joi = require("joi");

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).messages({
  "string.email": "Email musi być prawidłowy",
  "string.min": "Hasło musi mieć minimum 6 znaków",
  "any.required": "{#label} jest wymagane",
});

module.exports = { signupSchema };
