import { Credentials } from "@prisma/client";
import db from "../databases/prisma";

export type Credential = Omit<Credentials, "id">;

export async function registerCredential(credential: Credential) {
  await db.credentials.create({ data: credential });
}

export async function findUserCredentials(
  userId: number
): Promise<Credentials[]> {
  return db.credentials.findMany({ where: { ownerId: userId } });
}

export async function findCredentialById(
  id: number
): Promise<Credentials | null> {
  return db.credentials.findUnique({ where: { id } });
}

export async function findCredentialByOwnerIdAndTitle(
  ownerId: number,
  title: string
): Promise<Credentials | null> {
  return db.credentials.findUnique({
    where: { ownerId_title: { ownerId, title } },
  });
}
