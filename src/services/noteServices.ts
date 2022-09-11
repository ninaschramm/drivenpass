import * as notesRepository from '../repositories/notesRepository'
import { INote } from '../types/noteTypes'

export async function registerNote(Note: INote, userId: number) {
    const { title, text } = Note
    const result = await notesRepository.insert(title, text, userId)
    return (result)
}

export async function getNotesByUser(userId: number) {    
    const notes = (await notesRepository.getNotesByUser(userId))
    return (notes)
}

export async function getOneNote(userId: number, id: number) {
    const note = await notesRepository.getOneNote(userId, id)
    return (note)
}

export async function deleteNote(userId: number, id: number) {
    const result = await notesRepository.deleteNote(userId, id)
    return (result)
}