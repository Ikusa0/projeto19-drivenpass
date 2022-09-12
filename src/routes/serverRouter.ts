import { Router } from "express";
import authRouter from "./authRouter";
import credentialsRouter from "./credentialsRouter";
import annotationsRouter from "./annotationsRouter";
import cardsRouter from "./cardsRouter";
import wifisRouter from "./wifisRouter";

const serverRouter = Router();

serverRouter.use(authRouter);
serverRouter.use(credentialsRouter);
serverRouter.use(annotationsRouter);
serverRouter.use(cardsRouter);
serverRouter.use(wifisRouter);

export default serverRouter;
