import { Request, Response, NextFunction } from "express";
import schemas from "../schemas/allSchemas.js";

export default function validateJoi(schema: keyof typeof schemas) {
  if (!schemas[schema]) {
    return (req: Request, res: Response) => {
      console.log("Error during validation: schema not found.");
      res.sendStatus(500);
    };
  }

  // eslint-disable-next-line consistent-return
  return (req: Request, res: Response, next: NextFunction) => {
    const object: object = req.body;

    const validate = schemas[schema].validate(object);
    if (validate.error) {
      return res
        .status(422)
        .send(validate.error.details.map((err: any) => err.message).join("\n"));
    }

    next();
  };
}
