const validate = (schema) => (req, res, next) => {
  console.log("Content‑Type header:", req.headers["content-type"]);
  console.log("Raw body:", req.body);
  console.log("req.body:", req.body);
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validate;
