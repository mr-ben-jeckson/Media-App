const Joi = require('joi');

module.exports = {
    AddCat: Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required()
    }),
    RegisterSchema: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(8).max(25).required(),
        password: Joi.string().min(8).max(25).required(),
    }),
    AllSchema: {
        id: Joi.object({
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        image: Joi.object({
            image: Joi.string().required()
        })
    }
};