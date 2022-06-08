import { Router } from "express";
import { signUp, signIn } from "./../controllers/authController.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";
import validSchema from "../middwares/validateSchemaMiddwares.js";
import { validSignUp, validSignIn } from "../middwares/validateAuthMiddwares.js";

const authRouter = Router();

authRouter.post("/sign-up", validSchema(signUpSchema), validSignUp, signUp);
authRouter.post("/sign-in", validSchema(signInSchema), validSignIn, signIn);

export default authRouter;