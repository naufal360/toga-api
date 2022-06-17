const Joi = require('joi');

const medikasiValidator = Joi.object({
    _id: Joi.number().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    material: Joi.array().required(),
    make: Joi.string().required(),
    consume: Joi.string().required(),
    moreAbout: Joi.string().required(),
});

module.exports = medikasiValidator;

