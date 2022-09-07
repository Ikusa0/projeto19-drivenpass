import { Annotations } from "@prisma/client";
import db from "../databases/prisma";

export type Annotation = Omit<Annotations, "id">;

export async function registerAnnotation(annotation: Annotation) {
  await db.annotations.create({ data: annotation });
}

export function findUserAnnotations(userId: number): Promise<Annotations[]> {
  return db.annotations.findMany({ where: { ownerId: userId } });
}

export function findAnnotationById(id: number): Promise<Annotations | null> {
  return db.annotations.findUnique({ where: { id } });
}

export function findAnnotationByOwnerIdAndTitle(
  ownerId: number,
  title: string
): Promise<Annotations | null> {
  return db.annotations.findUnique({
    where: { ownerId_title: { ownerId, title } },
  });
}

export async function deleteAnnotationById(id: number) {
  await db.annotations.delete({ where: { id } });
}
