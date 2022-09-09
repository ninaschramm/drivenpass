import * as userRepository from '../repositories/userRepository'

export async function createUser(email: string, password: string) {
    await userRepository.insert(email, password)
}