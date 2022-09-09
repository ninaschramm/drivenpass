import client from "../config/db";

export async function insert(email: string, password: string) {
    await client.users.create({
        data: {
            email,
            password
        }
    });
}

export async function checkEmail(email: string) {
    await client.users.findUnique({
        where: { email }
    })
}