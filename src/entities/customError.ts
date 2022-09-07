import { ErrorType } from "../middlewares/errorHandler";

export interface CustomErrorInterface {
  type: ErrorType;
  message: string;
}

export class CustomError implements CustomErrorInterface {
  type: ErrorType;

  message: string;

  constructor(error: { type: ErrorType; message: string }) {
    this.type = error.type;
    this.message = error.message;
  }
}
