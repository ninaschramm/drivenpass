import { Router } from "express";

import authRouter from "./authRouters";
import credentialsRouter from "./credentialRouter";
import notesRouter from "./notesRouter";

const router = Router();

router.use(authRouter, credentialsRouter, notesRouter)

 export { router };