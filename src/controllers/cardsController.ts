import { Cards } from "@prisma/client";
import { Request, Response } from "express";
import { Card } from "../repositories/cardRepository";
import * as cardsService from "../services/cardsService/cardsService";

export async function registerCard(req: Request, res: Response) {
  const ownerId: number = 2;
  const card: Card = req.body;

  await cardsService.registerCard({ ...card, ownerId });
  res.sendStatus(201);
}

export async function getUserCards(req: Request, res: Response) {
  const ownerId: number = 2;

  const cards: Cards[] = await cardsService.getUserCards(ownerId);
  res.send(cards);
}

export async function getCardById(req: Request, res: Response) {
  const ownerId: number = 2;
  const cardId: number = Number(req.params.id);

  const card: Cards = await cardsService.getCardById(ownerId, cardId);

  res.send(card);
}

export async function deleteCardById(req: Request, res: Response) {
  const ownerId: number = 2;
  const cardId: number = Number(req.params.id);

  await cardsService.deleteCardById(ownerId, cardId);

  res.sendStatus(200);
}
