import { Router } from "express";
import wifiSchema from "../schemas/wifiSchema";
import { validateToken } from "../middlewares/authValidator";



import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { deleteWifi, getOneWifi, getWifiByUser, registerWifi } from "../controllers/wifiControllers";

const wifiRouter = Router();

wifiRouter.post("/wifi", validateSchemaMiddleware(wifiSchema), validateToken, registerWifi);
wifiRouter.get("/wifi", validateToken, getWifiByUser);
wifiRouter.get("/wifi/:id", validateToken, getOneWifi);
wifiRouter.delete("/wifi/:id", validateToken, deleteWifi);



export default wifiRouter;