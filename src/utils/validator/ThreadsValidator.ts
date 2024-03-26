import * as Joi from "joi";

export const ThreadsValidator = Joi.object ({
    content : Joi.string().required(),
    image : Joi.string().optional().allow(null),
    posted_at: Joi.string().optional().allow(null),
    userId: Joi.string().optional().allow(null)
    
})