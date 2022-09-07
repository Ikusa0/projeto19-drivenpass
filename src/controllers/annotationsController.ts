import { Annotations } from "@prisma/client";
import { Request, Response } from "express";
import { Annotation } from "../repositories/annotationsRepository";
import * as annotationsService from "../services/annotationsService/annotationsService";

export async function registerAnnotation(req: Request, res: Response) {
  const ownerId: number = 2;
  const annotation: Annotation = req.body;

  await annotationsService.registerAnnotation({ ...annotation, ownerId });
  res.sendStatus(201);
}

export async function getUserAnnotations(req: Request, res: Response) {
  const ownerId: number = 2;

  const annotations: Annotations[] =
    await annotationsService.getUserAnnotations(ownerId);
  res.send(annotations);
}

export async function getAnnotationById(req: Request, res: Response) {
  const ownerId: number = 2;
  const annotationId: number = Number(req.params.id);

  const annotation: Annotations = await annotationsService.getAnnotationById(
    ownerId,
    annotationId
  );

  res.send(annotation);
}

export async function deleteAnnotationById(req: Request, res: Response) {
  const ownerId: number = 2;
  const annotationId: number = Number(req.params.id);

  await annotationsService.deleteAnnotationById(ownerId, annotationId);

  res.sendStatus(200);
}
