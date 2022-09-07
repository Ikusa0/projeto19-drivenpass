import { Credentials } from "@prisma/client";
import db from "../databases/prisma";

export type Credential = Omit<Credentials, "id">;

export async function registerCredential(credential: Credential) {
  await db.credentials.create({ data: credential });
}

export function findUserCredentials(userId: number): Promise<Credentials[]> {
  return db.credentials.findMany({ where: { ownerId: userId } });
}

export function findCredentialById(id: number): Promise<Credentials | null> {
  return db.credentials.findUnique({ where: { id } });
}

export function findCredentialByOwnerIdAndTitle(
  ownerId: number,
  title: string
): Promise<Credentials | null> {
  return db.credentials.findUnique({
    where: { ownerId_title: { ownerId, title } },
  });
}

export async function deleteCredentialById(id: number) {
  await db.credentials.delete({ where: { id } });
}
