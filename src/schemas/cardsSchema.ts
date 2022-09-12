/* eslint-disable newline-per-chained-call */
import joiBase from "joi";
import joiDate from "@joi/date";

const joi = joiBase.extend(joiDate);

export const cardsSchema = joi.object({
  title: joi.string().trim().alphanum().max(50).label("Title").required(),
  number: joi.string().creditCard().label("Number").required(),
  name: joi
    .string()
    .uppercase()
    .trim()
    .regex(/^[A-Z\s]+$/)
    .label("Name")
    .required(),
  securityCode: joi
    .string()
    .trim()
    .regex(/^\d+$/)
    .min(3)
    .max(4)
    .label("Security Code")
    .required(),
  expirationDate: joi.date().format("MM/YY").raw(),
  password: joi.string().label("Password").required(),
  isVirtual: joi.boolean().label("Is Virtual").required(),
  type: joi.string().valid("CREDIT", "DEBIT", "BOTH").label("Type").required(),
});
