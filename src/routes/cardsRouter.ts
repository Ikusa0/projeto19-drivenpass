import { Router } from "express";
import validateJoi from "../middlewares/joiMiddleware";
import * as cardsController from "../controllers/cardsController";
import { validateToken } from "../middlewares/tokenMiddleware";

const cardsRouter = Router();

cardsRouter.post(
  "/cards/register",
  validateToken,
  validateJoi("registerCard"),
  cardsController.registerCard
);
cardsRouter.get("/cards", validateToken, cardsController.getUserCards);
cardsRouter.get("/cards/:id", validateToken, cardsController.getCardById);
cardsRouter.delete("/cards/:id", validateToken, cardsController.deleteCardById);

export default cardsRouter;
