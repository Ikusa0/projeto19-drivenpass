/* eslint-disable newline-per-chained-call */
import joi from "joi";

export const annotationsSchema = joi.object({
  title: joi.string().alphanum().trim().max(50).label("Title").required(),
  description: joi.string().trim().max(1000).label("Description").required(),
});
