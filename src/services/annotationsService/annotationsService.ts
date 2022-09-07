import { Users, Annotations } from "@prisma/client";
import * as annotationsRepository from "../../repositories/annotationsRepository";
import { Annotation } from "../../repositories/annotationsRepository";
import * as authRepository from "../../repositories/authRepository";
import * as authValidation from "../authService/authValidation";
import * as annotationsValidation from "./annotationsValidation";

export async function registerAnnotation(annotation: Annotation) {
  const { ownerId }: { ownerId: number } = annotation;
  const owner: Users | null = await authRepository.findUserById(ownerId);

  authValidation.ensureUserExists(owner);
  await annotationsValidation.ensureUniqueTitle(annotation);

  await annotationsRepository.registerAnnotation(annotation);
}

export async function getUserAnnotations(
  ownerId: number
): Promise<Annotations[]> {
  const owner: Users | null = await authRepository.findUserById(ownerId);
  authValidation.ensureUserExists(owner);

  const annotations: Annotations[] =
    await annotationsRepository.findUserAnnotations(ownerId);

  return annotations;
}

export async function getAnnotationById(
  ownerId: number,
  annotationId: number
): Promise<Annotations> {
  const owner: Users | null = await authRepository.findUserById(ownerId);
  authValidation.ensureUserExists(owner);

  const annotation: Annotations | null =
    await annotationsRepository.findAnnotationById(annotationId);

  annotationsValidation.ensureAnnotationExists(annotation);
  annotationsValidation.isOwner(annotation!, owner!);

  return annotation!;
}

export async function deleteAnnotationById(
  ownerId: number,
  annotationId: number
) {
  const owner: Users | null = await authRepository.findUserById(ownerId);
  authValidation.ensureUserExists(owner);

  const annotation: Annotations | null =
    await annotationsRepository.findAnnotationById(annotationId);

  annotationsValidation.ensureAnnotationExists(annotation);
  annotationsValidation.isOwner(annotation!, owner!);

  await annotationsRepository.deleteAnnotationById(annotationId);
}
