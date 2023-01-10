const { optional } = require('joi');
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
    CommentSchema: Joi.object({
        postId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        content: Joi.string().required()
    }),
    TagSchema: {
        add: Joi.object({
            name: Joi.string().required(),
            image: Joi.string().required(),
            user: Joi.optional()
        })
    },
    PostSchema: Joi.object({
        cat: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        tag: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        title: Joi.string().required(),
        image: Joi.string().required(),
        description: Joi.string().required(),
        user: Joi.optional()
    }),
    AllSchema: {
        id: Joi.object({
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        image: Joi.object({
            image: Joi.string().required()
        }),
        page: Joi.object({
            page: Joi.number().required()
        }),
        like: Joi.object({
            page: Joi.number().required()
        })
    }
};