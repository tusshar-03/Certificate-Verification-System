// middleware/validateCertificate.js
const Joi = require('joi');

const validateCertificate = (req, res, next) => {
  const schema = Joi.object({
    certificateID: Joi.string().required(),
    studentName: Joi.string().required(),
    internshipDomain: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};

module.exports = validateCertificate;
