import client from "../config/db";

export async function insert(title: string, text: string, userId: number) {
    await client.notes.create({
        data: {
            title,
            text,
            userId
        }
    });
}

export async function getNotesByUser(userId: number) {
    const userNotes = await client.notes.findMany({
        where: { userId }
    })
    return userNotes
}

export async function getOneNote(userId: number, id: number) {
    const userNote = await client.notes.findFirstOrThrow({
        where: { userId, id }
    })
    return (userNote)
}

export async function deleteNote(userId: number, id: number) {
    const userNote = await client.notes.findFirst({
        where: { userId, id }
    })
    if (!userNote) 
    { return ('404') }
    else {
    await client.notes.delete({
        where: { id }
    })
    }
}