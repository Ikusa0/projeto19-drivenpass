import { Router } from "express";
import validateJoi from "../middlewares/joiMiddleware";
import * as wifisController from "../controllers/wifisController";
import { validateToken } from "../middlewares/tokenMiddleware";

const wifisRouter = Router();

wifisRouter.post(
  "/wifis/register",
  validateToken,
  validateJoi("registerWifi"),
  wifisController.registerWifi
);
wifisRouter.get("/wifis", validateToken, wifisController.getUserWifis);
wifisRouter.get("/wifis/:id", validateToken, wifisController.getWifiById);
wifisRouter.delete("/wifis/:id", validateToken, wifisController.deleteWifiById);

export default wifisRouter;
