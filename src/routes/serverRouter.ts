import { Router } from "express";
import authRouter from "./authRouter";

const serverRouter = Router();

serverRouter.use(authRouter);

export default serverRouter;
