import * as wifiServices from '../services/wifiServices'
import { IWifi } from '../types/wifiTypes'
import Cryptr from 'cryptr';
import { Request, Response } from 'express';

const SECRET = process.env.TOKEN_SECRET;
const crypter = new Cryptr(SECRET)

export async function registerWifi(req: Request, res: Response) {
    
    const userId: number = +res.locals.id;
    let wifi: IWifi = req.body;
    const encryptedPassword: string = crypter.encrypt(wifi.password)

    wifi = {...wifi, password: encryptedPassword}
    
    try {
        await wifiServices.registerWifi(wifi, userId)
        res.sendStatus(201)
    }
    catch (error) {        
            res.status(500).send('Algo deu errado. Tente novamente mais tarde.')               
    }   
}

export async function getWifiByUser(req: Request, res: Response) {
    const userId: number = +res.locals.id;
    try {
        let wifis = await wifiServices.getWifiByUser(userId);
        wifis.map(wifi => wifi.password = crypter.decrypt(wifi.password))
        res.status(200).send(wifis)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function getOneWifi(req: Request, res: Response) {
    const userId: number = +res.locals.id;
    const id: number = +req.params.id;
    try {
        let wifi = await wifiServices.getOneWifi(userId, id)
        wifi = {...wifi, password: crypter.decrypt(wifi.password)}
        res.status(200).send(wifi)
    }
    catch (error) {
        res.status(404).send('Não há nenhuma credencial registrada na sua conta com este ID')
    }
}

export async function deleteWifi(req: Request, res: Response) {
    const userId: number = +res.locals.id;
    const id: number = +req.params.id;
    try {
        const result = await wifiServices.deleteWifi(userId, id)
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