import { Users, Annotations } from "@prisma/client";
import { Annotation } from "../../repositories/annotationsRepository";
import * as annotationsRepository from "../../repositories/annotationsRepository";
import { CustomError } from "../../entities/customError";

export async function ensureUniqueTitle(annotation: Annotation) {
  const { ownerId, title }: { ownerId: number; title: string } = annotation;
  const annotationInDb: Annotations | null =
    await annotationsRepository.findAnnotationByOwnerIdAndTitle(ownerId, title);

  if (annotationInDb) {
    throw new CustomError({
      type: "error_conflict",
      message: "You already have a annotation with this title",
    });
  }
}

export function ensureAnnotationExists(annotation: Annotation | null) {
  if (!annotation) {
    throw new CustomError({
      type: "error_not_found",
      message: "There is no annotation with such ID",
    });
  }
}

export function isOwner(annotation: Annotations, owner: Users) {
  if (annotation.ownerId !== owner.id) {
    throw new CustomError({
      type: "error_unauthorized",
      message: "You're not allowed to access this annotation",
    });
  }
}
