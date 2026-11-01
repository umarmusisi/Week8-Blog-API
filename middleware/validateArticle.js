const Joi = require('joi');

// Article validation schema
const articleSchema = Joi.object({

    title: Joi.string()
        .trim()
        .min(3)
        .max(150)
        .required(),

    content: Joi.string()
        .trim()
        .min(10)
        .required(),

    author: Joi.string()
        .trim()
        .min(2)
        .required(),

    category: Joi.string()
        .trim()
        .required(),

    tags: Joi.array()
        .items(Joi.string().trim())
        .default([])

}).unknown(false);


// CREATE ARTICLE VALIDATION
const validateCreateArticle = (req, res, next) => {

    const { error, value } = articleSchema.validate(req.body, {
        abortEarly: false
    });

    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: error.details.map(detail => detail.message)
        });
    }

    req.body = value;

    next();
};


// UPDATE ARTICLE VALIDATION
const validateUpdateArticle = (req, res, next) => {

    const updateSchema = articleSchema
        .fork(
            ['title', 'content', 'author', 'category'],
            field => field.optional()
        )
        .min(1);

    const { error, value } = updateSchema.validate(req.body, {
        abortEarly: false
    });

    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: error.details.map(detail => detail.message)
        });
    }

    req.body = value;

    next();
};


module.exports = {
    validateCreateArticle,
    validateUpdateArticle
};