import * as noteServices from '../services/noteServices'
import { INote } from '../types/noteTypes'
import { Request, Response } from 'express';

export async function postNote(req: Request, res: Response) {
    
    const userId: number = +res.locals.id;
    let Note: INote = req.body;    
    try {
        await noteServices.registerNote(Note, userId)
        res.sendStatus(201)
    }
    catch (error) {
        let code = error.code
        if (code == 'P2002') {
            res.status(409).send('Título já cadastrado')
        }
        else {
            res.status(500).send('Algo deu errado. Tente novamente mais tarde.')
        }        
    }   
}

export async function getNotesByUser(req: Request, res: Response) {
    const userId: number = +res.locals.id;
    try {
        let notes = await noteServices.getNotesByUser(userId);        
        res.status(200).send(notes)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function getOneNote(req: Request, res: Response) {
    const userId: number = +res.locals.id;
    const id: number = +req.params.id;
    try {
        let note = await noteServices.getOneNote(userId, id)       
        res.status(200).send(note)
    }
    catch (error) {
        res.status(404).send('Não há nenhuma nota registrada na sua conta com este ID')
    }
}

export async function deleteNote(req: Request, res: Response) {
    const userId: number = +res.locals.id;
    const id: number = +req.params.id;
    try {
        const result = await noteServices.deleteNote(userId, id)
        if (result === '404') {
            res.status(404).send('Não há nenhuma nota registrada na sua conta com este ID')
        }
        else {
        res.status(204).send('Nota deletada')
        }
    }
    catch (error) {
        res.status(404).send('Não há nenhuma nota registrada na sua conta com este ID')
    }
}