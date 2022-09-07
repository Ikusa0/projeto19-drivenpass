import { Router } from "express";
import authRouter from "./authRouter";
import credentialsRouter from "./credentialsRouter";
import annotationsRouter from "./annotationsRouter";

const serverRouter = Router();

serverRouter.use(authRouter);
serverRouter.use(credentialsRouter);
serverRouter.use(annotationsRouter);

export default serverRouter;
