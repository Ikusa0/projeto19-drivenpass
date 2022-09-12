import { Users, Cards } from "@prisma/client";
import * as cardsRepository from "../../repositories/cardRepository";
import { Card } from "../../repositories/cardRepository";
import * as authRepository from "../../repositories/authRepository";
import * as authValidation from "../authService/authValidation";
import * as cardsValidation from "./cardsValidation";
import * as cryptographyUtils from "../../utils/cryptographyUtils";

export async function registerCard(card: Card) {
  const { ownerId }: { ownerId: number } = card;
  const owner: Users | null = await authRepository.findUserById(ownerId);

  authValidation.ensureUserExists(owner);
  await cardsValidation.ensureUniqueTitle(card);

  const encryptedPassword: string = cryptographyUtils.encryptString(
    card.password
  );
  const encryptedSecurityCode: string = cryptographyUtils.encryptString(
    card.securityCode
  );

  await cardsRepository.registerCard({
    ...card,
    password: encryptedPassword,
    securityCode: encryptedSecurityCode,
  });
}

export async function getUserCards(ownerId: number): Promise<Cards[]> {
  const owner: Users | null = await authRepository.findUserById(ownerId);
  authValidation.ensureUserExists(owner);

  const cards: Cards[] = await cardsRepository.findUserCards(ownerId);
  const decryptedCards = cryptographyUtils.decryptObjectArray(cards, [
    "password",
    "securityCode",
  ]);
  return decryptedCards;
}

export async function getCardById(
  ownerId: number,
  cardId: number
): Promise<Cards> {
  const owner: Users | null = await authRepository.findUserById(ownerId);
  authValidation.ensureUserExists(owner);

  const card: Cards | null = await cardsRepository.findCardById(cardId);

  cardsValidation.ensureCardExists(card);
  cardsValidation.isOwner(card!, owner!);

  card!.password = cryptographyUtils.decryptString(card!.password);
  card!.securityCode = cryptographyUtils.decryptString(card!.securityCode);
  return card!;
}

export async function deleteCardById(ownerId: number, cardId: number) {
  const owner: Users | null = await authRepository.findUserById(ownerId);
  authValidation.ensureUserExists(owner);

  const card: Cards | null = await cardsRepository.findCardById(cardId);

  cardsValidation.ensureCardExists(card);
  cardsValidation.isOwner(card!, owner!);

  await cardsRepository.deleteCardById(cardId);
}
