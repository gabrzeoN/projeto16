import { Router } from "express";
import validToken from "../middwares/validateTokenMiddware.js";
import { getUser } from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get("/users/:userId", validToken, getUser);

export default usersRouter;