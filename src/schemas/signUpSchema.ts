import Joi from 'joi';

const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(10)
})

export default signUpSchema