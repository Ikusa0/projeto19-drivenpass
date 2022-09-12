import { userSchema, newUserSchema } from "./userSchema";
import { credentialsSchema } from "./credentialsSchema";
import { annotationsSchema } from "./annotationsSchema";
import { cardsSchema } from "./cardsSchema";
import { wifisSchema } from "./wifisSchema";

export default {
  signup: newUserSchema,
  signin: userSchema,
  registerCredential: credentialsSchema,
  registerAnnotation: annotationsSchema,
  registerCard: cardsSchema,
  registerWifi: wifisSchema,
};
