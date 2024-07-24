
const Joi = require('joi');


const productSchema = Joi.object({
  id: Joi.number().integer().optional(), 
  name: Joi.string().min(3).required(),
  price: Joi.number().positive().required(),
  description: Joi.string().optional()
});


const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateProduct;
