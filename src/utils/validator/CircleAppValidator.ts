import * as Joi from "joi";

export const ThreadsValidator = Joi.object ({
    content : Joi.string().required(),
    image : Joi.string().optional().allow(null),
    posted_at: Joi.string().optional().allow(null),
    userId: Joi.number()
    
})

export const UserValidator = Joi.object ({
    username: Joi.string().required(),
    fullname: Joi.string().required(),
    email : Joi.string().required(),
    password : Joi.string().required(),
    profile_picture : Joi.string().optional().allow(null),
    profile_description : Joi.string().optional().allow(null)
})

export const RepliesValidator = Joi.object ({
    content: Joi.string().required(),
    image: Joi.string().optional().allow(null),
    userId:Joi.string().optional().allow(null),
    threadsId:Joi.string().optional().allow(null),
})