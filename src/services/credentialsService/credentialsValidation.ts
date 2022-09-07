import { Users, Credentials } from "@prisma/client";
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

export function ensureCredentialExists(credential: Credential | null) {
  if (!credential) {
    throw new CustomError({
      type: "error_not_found",
      message: "There is no credential with such ID",
    });
  }
}

export function isOwner(credential: Credentials, owner: Users) {
  if (credential.ownerId !== owner.id) {
    throw new CustomError({
      type: "error_unauthorized",
      message: "You're not allowed to access this credential",
    });
  }
}
