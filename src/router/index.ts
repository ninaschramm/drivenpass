import { Router } from "express";

import authRouter from "./authRouters";
import credentialsRouter from "./credentialRouter";

const router = Router();

router.use(authRouter, credentialsRouter)

 export { router };