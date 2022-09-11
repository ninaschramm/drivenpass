import { Router } from "express";

import userSchema from "../schemas/userSchema";

import { createUser } from "../controllers/authControllers";
import { signIn } from "../controllers/authControllers";

import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { checkExistingEmail } from "../middlewares/checkExistingEmail";

const authRouter = Router();

authRouter.post("/signup", validateSchemaMiddleware(userSchema), checkExistingEmail, createUser);
authRouter.post("/signin", validateSchemaMiddleware(userSchema), signIn);

export default authRouter;