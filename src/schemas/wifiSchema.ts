import Joi, { ObjectSchema } from 'joi';
import { IWifi } from '../types/wifiTypes'

const wifiSchema: ObjectSchema = Joi.object<IWifi>({
    title: Joi.string().required(),
    password: Joi.string().required(),
    networkName: Joi.string().required()
})

export default wifiSchema
