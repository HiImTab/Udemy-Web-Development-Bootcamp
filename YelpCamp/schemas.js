const BaseJoi = require('joi')
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    //nothing is allowed
                    allowedTags: [],
                    allowedAttributes: {},
                });
                //if clean is not equal to value, then there was html in it
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

//using joi to prevent errors from apps like postman (atm postman can create empty campgrounds)
//cause we only prevented errors from form so far^ so we want to validate from server side
//not a mongoose schema (will be used to validate our data before we even attempt to save to mongoose)
//colt's code
module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML()
    }).required(),
    deleteImages: Joi.array()
});

//NO FUCKING CLUE WHY THIS DOESNT WORK
/* module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.string().required.min(0),
        image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required()
}); */

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapeHTML()
    }).required()
})

/* review:{
    rating: number,
    body: string
} */