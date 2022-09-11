import { Router } from "express";

import credentialSchema from "../schemas/credentialSchema";
import { validateToken } from "../middlewares/authValidator";

import { postCredential } from "../controllers/credentialControllers";

import { validateSchemaMiddleware } from "../middlewares/validateSchema";

const credentialsRouter = Router();

credentialsRouter.post("/credentials", validateSchemaMiddleware(credentialSchema), validateToken, postCredential);
//credentialsRouter.get("/credentials", validateToken, signIn);

export default credentialsRouter;