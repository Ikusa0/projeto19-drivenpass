import { Credentials } from "@prisma/client";
import { Request, Response } from "express";
import { Credential } from "../repositories/credentialsRepository";
import * as credentialsService from "../services/credentialsService/credentialsService";

export async function registerCredential(req: Request, res: Response) {
  const ownerId: number = 2;
  const credential: Credential = req.body;

  await credentialsService.registerCredential({ ...credential, ownerId });
  res.sendStatus(201);
}

export async function getUserCredentials(req: Request, res: Response) {
  const ownerId: number = 2;

  const credentials: Credentials[] =
    await credentialsService.getUserCredentials(ownerId);
  res.send(credentials);
}

export async function getCredentialById(req: Request, res: Response) {
  const ownerId: number = 2;
  const credentialId: number = Number(req.params.id);

  const credential: Credentials = await credentialsService.getCredentialById(
    ownerId,
    credentialId
  );

  res.send(credential);
}

export async function deleteCredentialById(req: Request, res: Response) {
  const ownerId: number = 2;
  const credentialId: number = Number(req.params.id);

  await credentialsService.deleteCredentialById(ownerId, credentialId);

  res.sendStatus(200);
}
