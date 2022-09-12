import { Users, Cards } from "@prisma/client";
import { Card } from "../../repositories/cardRepository";
import * as cardsRepository from "../../repositories/cardRepository";
import { CustomError } from "../../entities/customError";

export async function ensureUniqueTitle(card: Card) {
  const { ownerId, title }: { ownerId: number; title: string } = card;
  const cardInDb: Cards | null =
    await cardsRepository.findCardByOwnerIdAndTitle(ownerId, title);

  if (cardInDb) {
    throw new CustomError({
      type: "error_conflict",
      message: "You already have a card with this title",
    });
  }
}

export function ensureCardExists(card: Card | null) {
  if (!card) {
    throw new CustomError({
      type: "error_not_found",
      message: "There is no card with such ID",
    });
  }
}

export function isOwner(card: Cards, owner: Users) {
  if (card.ownerId !== owner.id) {
    throw new CustomError({
      type: "error_unauthorized",
      message: "You're not allowed to access this card",
    });
  }
}
