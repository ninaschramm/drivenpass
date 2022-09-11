import * as wifiRepository from '../repositories/wifiRepository'
import { IWifi } from '../types/wifiTypes'

export async function registerWifi(Wifi: IWifi, userId: number) {
    const { title, networkName, password } = Wifi
    const result = await wifiRepository.insert( title, networkName, password, userId)
    return (result)
}

export async function getWifiByUser(userId: number) {    
    const credentials = (await wifiRepository.getWifiByUser(userId))
    return (credentials)
}

export async function getOneWifi(userId: number, id: number) {
    const credential = await wifiRepository.getWifi(userId, id)
    return (credential)
}

export async function deleteWifi(userId: number, id: number) {
    const result = await wifiRepository.deleteWifi(userId, id)
    return (result)
}