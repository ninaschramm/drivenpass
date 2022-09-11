import { Router } from "express";

import authRouter from "./authRouters";
import cardsRouter from "./cardsRouter";
import credentialsRouter from "./credentialRouter";
import notesRouter from "./notesRouter";
import wifiRouter from "./wifiRouters";

const router = Router();

router.use(authRouter, credentialsRouter, notesRouter, cardsRouter, wifiRouter)

 export { router };