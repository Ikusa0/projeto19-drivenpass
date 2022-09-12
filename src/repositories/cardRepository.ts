import { Cards } from "@prisma/client";
import db from "../databases/prisma";

export type Card = Omit<Cards, "id">;

export async function registerCard(card: Card) {
  await db.cards.create({ data: card });
}

export function findUserCards(userId: number): Promise<Cards[]> {
  return db.cards.findMany({ where: { ownerId: userId } });
}

export function findCardById(id: number): Promise<Cards | null> {
  return db.cards.findUnique({ where: { id } });
}

export function findCardByOwnerIdAndTitle(
  ownerId: number,
  title: string
): Promise<Cards | null> {
  return db.cards.findUnique({
    where: { ownerId_title: { ownerId, title } },
  });
}

export async function deleteCardById(id: number) {
  await db.cards.delete({ where: { id } });
}
