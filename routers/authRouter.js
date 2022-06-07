import { Router } from "express";
import { signUp } from "./../controllers/authController.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";
import validSchema from "../middwares/validateSchemaMiddwares.js";
import { validSignUp } from "../middwares/validateAuthMiddwares.js";

const authRouter = Router();

authRouter.post("/sign-up", validSignUp, signUp);


export default authRouter;