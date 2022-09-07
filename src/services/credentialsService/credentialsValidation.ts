import { Credentials } from "@prisma/client";
import { Credential } from "../../repositories/credentialsRepository";
import * as credentialsRepository from "../../repositories/credentialsRepository";
import { CustomError } from "../../entities/customError";

export async function ensureUniqueTitle(credential: Credential) {
  const { ownerId, title }: { ownerId: number; title: string } = credential;
  const credentialInDb: Credentials | null =
    await credentialsRepository.findCredentialByOwnerIdAndTitle(ownerId, title);

  if (credentialInDb) {
    throw new CustomError({
      type: "error_conflict",
      message: "You already have a credential with this title",
    });
  }
}
