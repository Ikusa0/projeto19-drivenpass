import { Router } from "express";
import validateJoi from "../middlewares/joiMiddleware";
import * as credentialsController from "../controllers/credentialsController";

const credentialsRouter = Router();

credentialsRouter.post(
  "/credentials/register",
  validateJoi("registerCredential"),
  credentialsController.registerCredential
);

export default credentialsRouter;
