import { Router } from "express";
import validateJoi from "../middlewares/joiMiddleware";

const authRouter = Router();

authRouter.post("signup", validateJoi("signup"));
export default authRouter;
