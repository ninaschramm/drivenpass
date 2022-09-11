import client from "../config/db";

export async function insert(title: string, networkName: string, password: string, userId: number) {
    await client.wifi.create({
        data: {
            title,
            networkName,
            password,
            userId
        }
    });
}

export async function getWifiByUser(userId: number) {
    const userWifi = await client.wifi.findMany({
        where: { userId }
    })
    return userWifi
}

export async function getWifi(userId: number, id: number) {
    const userWifi = await client.wifi.findFirstOrThrow({
        where: { userId, id }
    })
    return userWifi
}

export async function deleteWifi(userId: number, id: number) {
    const userWifi = await client.wifi.findFirst({
        where: { userId, id }
    })
    if (!userWifi) 
    { return ('404') }
    else {
    await client.wifi.delete({
        where: { id }
    })
    }
}