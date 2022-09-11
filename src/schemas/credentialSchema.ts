import Joi, { ObjectSchema } from 'joi';
import { ICredential } from '../types/credentialTypes';

const pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;


const credentialSchema: ObjectSchema = Joi.object<ICredential>({
    username: Joi.string().required(),
    password: Joi.string().required(),
    title: Joi.string().required(),
    url: Joi.string().regex(pattern).required()
})

export default credentialSchema
