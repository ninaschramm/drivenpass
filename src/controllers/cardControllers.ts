import * as cardServices from '../services/cardServices'
import { ICard } from '../types/cardTypes';
import Cryptr from 'cryptr';
import { Request, Response } from 'express';

const SECRET = process.env.TOKEN_SECRET;
const crypter = new Cryptr(SECRET)

export async function postCard(req: Request, res: Response) {
    
    const userId: number = +res.locals.id;
    let Card: ICard = req.body;
    console.log(Card)
    const newDate = new Date(Card.expirationDate)
    const encryptedPassword: string = crypter.encrypt(Card.password)

    Card = {...Card, password: encryptedPassword, expirationDate: newDate}
    
    try {
        await cardServices.registerCard(Card, userId)
        res.sendStatus(201)
    }
    catch (error) {
        let code = error.code
        if (code == 'P2002') {
            res.status(409).send('Título já cadastrado')
        }
        else {
            console.log(error)
            res.status(500).send('Algo deu errado. Tente novamente mais tarde.')
        }        
    }   
}

export async function getCardsByUser(req: Request, res: Response) {
    const userId: number = +res.locals.id;
    try {
        let cards = await cardServices.getCardsByUser(userId);
        cards.map(card => card.password = crypter.decrypt(card.password))
        res.status(200).send(cards)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function getOneCard(req: Request, res: Response) {
    const userId: number = +res.locals.id;
    const id: number = +req.params.id;
    try {
        let card = await cardServices.getOneCard(userId, id)
        card = {...card, password: crypter.decrypt(card.password)}
        res.status(200).send(card)
    }
    catch (error) {
        res.status(404).send('Não há nenhum cartão registrado na sua conta com este ID')
    }
}

export async function deleteCard(req: Request, res: Response) {
    const userId: number = +res.locals.id;
    const id: number = +req.params.id;
    try {
        const result = await cardServices.deleteCard(userId, id)
        if (result === '404') {
            res.status(404).send('Não há nenhum cartão registrado na sua conta com este ID')
        }
        else {
        res.status(204).send('cartão deletado')
        }
    }
    catch (error) {
        res.status(404).send('Não há nenhum cartão registrado na sua conta com este ID')
    }
}