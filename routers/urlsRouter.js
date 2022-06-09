import { Router } from "express";
import { createShortenedUrl, getShortenedUrl, openShortenedUrl, deleteShortenedUrl } from "../controllers/urlsController.js";
import validSchema from "../middwares/validateSchemaMiddwares.js";
import validToken from "../middwares/validateTokenMiddware.js";
import { urlSchema } from "../schemas/urlsSchemas.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validSchema(urlSchema), validToken, createShortenedUrl);
urlsRouter.get("/urls/:urlId", getShortenedUrl);
urlsRouter.get("/urls/open/:shortUrl", openShortenedUrl);
urlsRouter.delete("/urls/:urlId", validToken, deleteShortenedUrl);

export default urlsRouter;