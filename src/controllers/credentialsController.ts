import { Request, Response } from "express";
import { Credential } from "../repositories/credentialsRepository";
import * as credentialsService from "../services/credentialsService/credentialsService";

export async function registerCredential(req: Request, res: Response) {
  const ownerId: number = 2;
  const credential: Credential = req.body;

  await credentialsService.registerCredential({ ...credential, ownerId });
  res.sendStatus(201);
}
