import { Router } from "express";

import noteSchema from "../schemas/noteSchema";
import { validateToken } from "../middlewares/authValidator";


import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { getOneNote, postNote, getNotesByUser, deleteNote } from "../controllers/notesControllers";

const notesRouter = Router();

notesRouter.post("/notes", validateSchemaMiddleware(noteSchema), validateToken, postNote);
notesRouter.get("/notes", validateToken, getNotesByUser);
notesRouter.get("/notes/:id", validateToken, getOneNote);
notesRouter.delete("/notes/:id", validateToken, deleteNote);



export default notesRouter;