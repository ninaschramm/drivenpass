import { cardType } from "@prisma/client";
import { object } from "joi";
import client from "../config/db";

export async function insert(
    title: string, cardNumber: string, printedName: string, cvc: number, expirationDate: Date, password: string, virtual: boolean, cardType: cardType, userId: number
    ) {
    await client.cards.create({
        data: {
           title,
           cardNumber,
           printedName,
           cvc,
           expirationDate,
           password,
           virtual,
           cardType,
           userId
        }
    });
}

export async function getCardsByUser(userId: number) {
    const userCards = await client.cards.findMany({
        where: { userId }
    })
    return userCards
}

export async function getOneCard(userId: number, id: number) {
    const userCard = await client.cards.findFirstOrThrow({
        where: { userId, id }
    })
    return userCard
}

export async function deleteCard(userId: number, id: number) {
    const userCard = await client.cards.findFirst({
        where: { userId, id }
    })
    if (!userCard) 
    { return ('404') }
    else {
    await client.cards.delete({
        where: { id }
    })
    }
}