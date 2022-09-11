import Joi, { ObjectSchema } from 'joi';
import { ICard } from '../types/cardTypes';

const pattern = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;


const cardSchema: ObjectSchema = Joi.object<ICard>({
    title: Joi.string().required(),
    cardNumber: Joi.string().regex(pattern).required().messages({
      'string.pattern.base': "Número de cartão inválido"}),
    printedName: Joi.string().required(),
    cvc: Joi.number().min(3).required(),
    expirationDate: Joi.date().required(),
    password: Joi.number().min(4).required(),
    virtual: Joi.boolean(),
    cardType: Joi.valid('Debit', 'Credit', 'Both')
})

export default cardSchema