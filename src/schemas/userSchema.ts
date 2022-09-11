import Joi, { ObjectSchema } from 'joi';
import { IUser } from '../types/userTypes';

const userSchema: ObjectSchema = Joi.object<IUser>({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(10)
})

export default userSchema