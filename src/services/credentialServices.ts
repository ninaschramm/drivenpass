import * as credentialsRepository from '../repositories/credentialsRepository'
import { ICredential } from '../types/credentialTypes'

export async function registerCredential(Credential: ICredential, userId: number) {
    const { username, password, url, title } = Credential
    await credentialsRepository.insert(username, password, url, title, userId)
}

export async function getCredentialsByUser(userId: number) {    
    const credentials = (await credentialsRepository.getCredentialsByUser(userId))
    return (credentials)
}

export async function getOneCredential(userId: number, id: number) {
    const credential = await credentialsRepository.getOneCredential(userId, id)
    return (credential)
}

export async function deleteCredential(userId: number, id: number) {
    const result = await credentialsRepository.deleteCredential(userId, id)
    return (result)
}