const Joi = require('joi');

const tanamanValidator = Joi.object({
    imageUrl: Joi.string().required(),
    name: Joi.string().required(),
    latinName: Joi.string().required(),
    family: Joi.string().required(),
    description: Joi.string().required(),
    goodPart: Joi.string().required(),
    efficacy: Joi.array().items(Joi.string()),
});

module.exports = tanamanValidator;