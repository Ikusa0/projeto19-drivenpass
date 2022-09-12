import { Router } from "express";
import validateJoi from "../middlewares/joiMiddleware";
import * as annotationsController from "../controllers/annotationsController";
import { validateToken } from "../middlewares/tokenMiddleware";

const annotationsRouter = Router();

annotationsRouter.post(
  "/annotations/register",
  validateToken,
  validateJoi("registerAnnotation"),
  annotationsController.registerAnnotation
);
annotationsRouter.get(
  "/annotations",
  validateToken,
  annotationsController.getUserAnnotations
);
annotationsRouter.get(
  "/annotations/:id",
  validateToken,
  annotationsController.getAnnotationById
);
annotationsRouter.delete(
  "/annotations/:id",
  validateToken,
  annotationsController.deleteAnnotationById
);

export default annotationsRouter;
