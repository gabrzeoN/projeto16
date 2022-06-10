import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

import authRouter from "../routers/authRouter.js";
import urlsRouter from "../routers/urlsRouter.js";
import usersRouter from "../routers/usersRouter.js"

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(urlsRouter);
app.use(usersRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(chalk.bold.green(`Server online on port ${port}!`)));