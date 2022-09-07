import { Router } from "express";
import authRouter from "./authRouter";
import credentialsRouter from "./credentialsRouter";

const serverRouter = Router();

serverRouter.use(authRouter);
serverRouter.use(credentialsRouter);

export default serverRouter;
