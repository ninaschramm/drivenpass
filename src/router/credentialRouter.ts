import { Router } from "express";

import credentialSchema from "../schemas/credentialSchema";
import { validateToken } from "../middlewares/authValidator";

import { postCredential, getCredentialsByUser, getOneCredential, deleteCredential } from "../controllers/credentialControllers";

import { validateSchemaMiddleware } from "../middlewares/validateSchema";

const credentialsRouter = Router();

credentialsRouter.post("/credentials", validateSchemaMiddleware(credentialSchema), validateToken, postCredential);
credentialsRouter.get("/credentials", validateToken, getCredentialsByUser);
credentialsRouter.get("/credentials/:id", validateToken, getOneCredential);
credentialsRouter.delete("/credentials/:id", validateToken, deleteCredential);



export default credentialsRouter;