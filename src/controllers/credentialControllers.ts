import * as credentialServices from '../services/credentialServices'
import { ICredential } from '../types/credentialTypes';
import Cryptr from 'cryptr';
import { Request, Response } from 'express';

const SECRET = process.env.TOKEN_SECRET;
const crypter = new Cryptr(SECRET)

export async function postCredential(req: Request, res: Response) {
    
    const userId: number = +res.locals.id;
    let Credential: ICredential = req.body;
    const encryptedPassword: string = crypter.encrypt(Credential.password)

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
    const userId: number = +res.locals.id;
    try {
        let credentials = await credentialServices.getCredentialsByUser(userId);
        credentials.map(credential => credential.password = crypter.decrypt(credential.password))
        res.status(200).send(credentials)
    }
    catch (error) {
        console.log(error)
    }
}

export async function getOneCredential(req: Request, res: Response) {
    const userId: number = +res.locals.id;
    const id: number = +req.params.id;
    try {
        let credential = await credentialServices.getOneCredential(userId, id)
        credential = {...credential, password: crypter.decrypt(credential.password)}
        res.status(200).send(credential)
    }
    catch (error) {
        res.status(404).send('Não há nenhuma credencial registrada na sua conta com este ID')
    }
}

export async function deleteCredential(req: Request, res: Response) {
    const userId: number = +res.locals.id;
    const id: number = +req.params.id;
    try {
        const result = await credentialServices.deleteCredential(userId, id)
        if (result === '404') {
            res.status(404).send('Não há nenhuma credencial registrada na sua conta com este ID')
        }
        else {
        res.status(204).send('Credencial deletada')
        }
    }
    catch (error) {
        res.status(404).send('Não há nenhuma credencial registrada na sua conta com este ID')
    }
}