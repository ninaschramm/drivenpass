import { object } from "joi";
import client from "../config/db";

export async function insert(username: string, password: string, url:string, title: string, userId: number) {
    await client.credentials.create({
        data: {
            username,
            password,
            url,
            title,
            userId
        }
    });
}

export async function getCredentialsByUser(userId: number) {
    const userCredentials = await client.credentials.findMany({
        where: { userId }
    })
    return userCredentials
}

export async function getOneCredential(userId: number, id: number) {
    const userCredential = await client.credentials.findFirstOrThrow({
        where: { userId, id }
    })
    return userCredential
}

export async function deleteCredential(userId: number, id: number) {
    const userCredential = await client.credentials.findFirst({
        where: { userId, id }
    })
    if (!userCredential) 
    { return ('404') }
    else {
    await client.credentials.delete({
        where: { id }
    })
    }
}