import { Router } from "express";

import cardSchema from "../schemas/cardSchema";
import { validateToken } from "../middlewares/authValidator";

import { postCard, getCardsByUser, getOneCard, deleteCard } from "../controllers/cardControllers";

import { validateSchemaMiddleware } from "../middlewares/validateSchema";

const cardsRouter = Router();

cardsRouter.post("/cards", validateSchemaMiddleware(cardSchema), validateToken, postCard);
cardsRouter.get("/cards", validateToken, getCardsByUser);
cardsRouter.get("/cards/:id", validateToken, getOneCard);
cardsRouter.delete("/cards/:id", validateToken, deleteCard);



export default cardsRouter;