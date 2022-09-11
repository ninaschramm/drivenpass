import * as userRepository from '../repositories/userRepository'
import { IUser } from '../types/userTypes'

export async function createUser(email: string, password: string) {
    await userRepository.insert(email, password)
}

export async function signIn(email: string) {    
    const user = (await userRepository.checkEmail(email))
    return (user)
}