import { Router } from "express";
import validateJoi from "../middlewares/joiMiddleware";
import * as credentialsController from "../controllers/credentialsController";
import { validateToken } from "../middlewares/tokenMiddleware";

const credentialsRouter = Router();

credentialsRouter.post(
  "/credentials/register",
  validateToken,
  validateJoi("registerCredential"),
  credentialsController.registerCredential
);
credentialsRouter.get(
  "/credentials",
  validateToken,
  credentialsController.getUserCredentials
);
credentialsRouter.get(
  "/credentials/:id",
  validateToken,
  credentialsController.getCredentialById
);
credentialsRouter.delete(
  "/credentials/:id",
  validateToken,
  credentialsController.deleteCredentialById
);

export default credentialsRouter;
