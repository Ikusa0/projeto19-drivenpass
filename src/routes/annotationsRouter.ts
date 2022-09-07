import { Router } from "express";
import validateJoi from "../middlewares/joiMiddleware";
import * as annotationsController from "../controllers/annotationsController";

const annotationsRouter = Router();

annotationsRouter.post(
  "/annotations/register",
  validateJoi("registerAnnotation"),
  annotationsController.registerAnnotation
);
annotationsRouter.get("/annotations", annotationsController.getUserAnnotations);
annotationsRouter.get(
  "/annotations/:id",
  annotationsController.getAnnotationById
);
annotationsRouter.delete(
  "/annotations/:id",
  annotationsController.deleteAnnotationById
);

export default annotationsRouter;
