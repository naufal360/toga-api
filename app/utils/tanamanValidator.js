const Joi = require('joi');

const tanamanValidator = Joi.object({
    _id: Joi.number().required(),
    imageUrl: Joi.string().required(),
    name: Joi.string().required(),
    latinName: Joi.string().required(),
    family: Joi.string().required(),
    description: Joi.string().required(),
    goodPart: Joi.string().required(),
    efficacy: Joi.array().required(),
    contained: Joi.array().required(),
    articles: Joi.string().required(),
    youtube: Joi.string().required(),
});

module.exports = tanamanValidator;