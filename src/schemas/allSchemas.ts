import { userSchema, newUserSchema } from "./userSchema";
import { credentialsSchema } from "./credentialsSchema";
import { annotationsSchema } from "./annotationsSchema";

export default {
  signup: newUserSchema,
  signin: userSchema,
  registerCredential: credentialsSchema,
  registerAnnotation: annotationsSchema,
};
