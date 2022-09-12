import { Request, Response } from "express";
import { User } from "../repositories/authRepository";
import * as authService from "../services/authService/authService";

export async function registerUser(req: Request, res: Response) {
  const { email, password }: User = req.body;

  await authService.registerUser({ email, password });
  res.sendStatus(201);
}

export async function logInUser(req: Request, res: Response) {
  const { email, password }: User = req.body;

  const token: string = await authService.logInUser({ email, password });
  res.send({ token });
}
