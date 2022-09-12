import { Wifis } from "@prisma/client";
import { Request, Response } from "express";
import { Wifi } from "../repositories/wifisRepository";
import * as wifisService from "../services/wifisService/wifisService";

export async function registerWifi(req: Request, res: Response) {
  const ownerId: number = 2;
  const wifi: Wifi = req.body;

  await wifisService.registerWifi({ ...wifi, ownerId });
  res.sendStatus(201);
}

export async function getUserWifis(req: Request, res: Response) {
  const ownerId: number = 2;

  const wifis: Wifis[] = await wifisService.getUserWifis(ownerId);
  res.send(wifis);
}

export async function getWifiById(req: Request, res: Response) {
  const ownerId: number = 2;
  const wifiId: number = Number(req.params.id);

  const wifi: Wifis = await wifisService.getWifiById(ownerId, wifiId);

  res.send(wifi);
}

export async function deleteWifiById(req: Request, res: Response) {
  const ownerId: number = 2;
  const wifiId: number = Number(req.params.id);

  await wifisService.deleteWifiById(ownerId, wifiId);

  res.sendStatus(200);
}
