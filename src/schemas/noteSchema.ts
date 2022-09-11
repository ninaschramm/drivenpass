import Joi, { ObjectSchema } from 'joi';
import { INote } from '../types/noteTypes';

const noteSchema: ObjectSchema = Joi.object<INote>({
    title: Joi.string().max(50).required(),
    text: Joi.string().required().max(1000)
})

export default noteSchema