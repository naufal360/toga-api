const Joi = require('joi');

const medikasiValidator = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    treatment: Joi.object({
      material: Joi.array().required(),
      make: Joi.string().required(),
      consume: Joi.string().required(),
    }).required(),
});

module.exports = medikasiValidator;

