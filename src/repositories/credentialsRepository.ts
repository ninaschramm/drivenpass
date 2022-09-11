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
