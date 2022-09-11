import * as credentialServices from '../services/credentialServices'
import { ICredential } from '../types/credentialTypes';
import Cryptr from 'cryptr';
import { Request, Response } from 'express';
import { errorHandlerMiddleware } from '../middlewares/errorMiddleware';

const SECRET = process.env.TOKEN_SECRET;

export async function postCredential(req: Request, res: Response) {
    const crypter = new Cryptr(SECRET)
    const userId = res.locals.id
    let Credential: ICredential = req.body;
    const encryptedPassword = crypter.encrypt(Credential.password)

    Credential = {...Credential, password: encryptedPassword}
    
    try {
        await credentialServices.registerCredential(Credential, userId)
        res.sendStatus(201)
    }
    catch (error) {
        let code = error.code
        if (code == 'P2002') {
            res.status(409).send('Título já cadastrado')
        }
        else {
            res.status(500).send('Algo deu errado. Tente novamente mais tarde.')
        }
        
    }
   
}
