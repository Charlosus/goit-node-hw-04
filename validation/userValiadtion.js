const Joi = require("joi");

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).messages({
  "string.email": "Email musi być prawidłowy",
  "string.min": "Hasło musi mieć minimum 6 znaków",
  "any.required": "{#label} jest wymagane",
});

const reSendSchema = Joi.object({
  
  email: Joi.string().email().required(),
}).messages({
  "string.email": "Email must be correct address",
  "any.required": "Email is required",
});

module.exports = { signupSchema, reSendSchema };
