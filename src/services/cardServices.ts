import * as cardsRepository from '../repositories/cardsRepository'
import { ICard } from '../types/cardTypes'

export async function registerCard(Card: ICard, userId: number) {
    const { title, cardNumber, printedName, cvc, expirationDate, password, virtual, cardType } = Card
    const result = await cardsRepository.insert(title, cardNumber, printedName, cvc, expirationDate, password, virtual, cardType, userId)
    console.log(result)
    return (result)
}

export async function getCardsByUser(userId: number) {    
    const cards = (await cardsRepository.getCardsByUser(userId))
    return (cards)
}

export async function getOneCard(userId: number, id: number) {
    const card = await cardsRepository.getOneCard(userId, id)
    return (card)
}

export async function deleteCard(userId: number, id: number) {
    const result = await cardsRepository.deleteCard(userId, id)
    return (result)
}