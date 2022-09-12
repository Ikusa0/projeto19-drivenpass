/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../entities/customError";

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization }: { authorization?: string | undefined } = req.headers;
  const token: string | undefined = authorization?.replace("Bearer ", "");

  if (!token) {
    throw new CustomError({
      type: "error_unauthorized",
      message: "Token is empty.",
    });
  }

  try {
    const { id: userId }: any = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.userId = userId;
  } catch (err) {
    throw new CustomError({
      type: "error_unauthorized",
      message: "Invalid token.",
    });
  }

  next();
}
