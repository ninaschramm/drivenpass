import * as credentialsRepository from '../repositories/credentialsRepository'
import { ICredential } from '../types/credentialTypes'

export async function registerCredential(Credential: ICredential, userId: number) {
    const { username, password, url, title } = Credential
    await credentialsRepository.insert(username, password, url, title, userId)
}

export async function getCredentialsByUser(userId: number) {    
    const user = (await credentialsRepository.getCredentialsByUser(userId))
    return (user)
}