import { Router } from "express";
import { createShortenedUrl } from "../controllers/urlsController.js";
import validSchema from "../middwares/validateSchemaMiddwares.js";
import validToken from "../middwares/validateTokenMiddware.js";
import { urlSchema } from "../schemas/urlsSchemas.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validSchema(urlSchema), validToken, createShortenedUrl);

export default urlsRouter;