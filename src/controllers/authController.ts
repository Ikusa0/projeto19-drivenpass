import { Request, Response } from "express";
import { NewUser } from "../repositories/authRepository";
import * as authService from "../services/authService";

export async function registerUser(req: Request, res: Response) {
  const { email, password }: NewUser = req.body;

  await authService.registerUser({ email, password });
  res.sendStatus(201);
}
