import * as credentialServices from '../services/credentialServices'
import { ICredential } from '../types/credentialTypes';
import Cryptr from 'cryptr';
import { Request, Response } from 'express';
import { errorHandlerMiddleware } from '../middlewares/errorMiddleware';

const SECRET = process.env.TOKEN_SECRET;
const crypter = new Cryptr(SECRET)

export async function postCredential(req: Request, res: Response) {
    
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

export async function getCredentialsByUser(req: Request, res: Response) {
    const userId = res.locals.id;
    let credentials = await credentialServices.getCredentialsByUser(userId);
    credentials.map(credential => credential.password = crypter.decrypt(credential.password))
    res.status(200).send(credentials)
}