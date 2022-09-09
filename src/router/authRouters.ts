import { Router } from "express";

import signUpSchema from "../schemas/signUpSchema";
// import signInSchema from "../schemas/signInSchema.js";

import { createUser } from "../controllers/authControllers";
// import { signIn } from "../controllers/authController.js";

import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { checkExistingEmail } from "../middlewares/checkExistingEmail";

const authRouter = Router();

authRouter.post("/signup", validateSchemaMiddleware(signUpSchema), checkExistingEmail, createUser);
// authRouter.post("/signin", validateSchema(signInSchema), signIn);

export default authRouter;