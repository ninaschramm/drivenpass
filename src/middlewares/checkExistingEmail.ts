import { NextFunction, Request, Response } from 'express';
import * as userRepository from '../repositories/userRepository'

export async function checkExistingEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const result = await userRepository.checkEmail(email)
    console.log(result)
    if (result === null || result === undefined) {
        next()
    }
    else {
        throw new Error('E-mail já cadastrado!') 
    }
}