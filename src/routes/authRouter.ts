import { Router } from "express";
import validateJoi from "../middlewares/joiMiddleware";
import * as authController from "../controllers/authController";

const authRouter = Router();

authRouter.post("/signup", validateJoi("signup"), authController.registerUser);
export default authRouter;
