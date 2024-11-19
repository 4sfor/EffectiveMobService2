import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { errorHandlerMiddleware } from "./middleware/errorHandler.middleware.js";
import apiRouter from "./apiRouter.js";
import { filterMiddleware } from "./middleware/filter.middleware.js";
import connectionDb from "./connectionDb.js";
import validation from "./middleware/validation.middleware.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(errorHandlerMiddleware);
app.use(express.json());
app.use(validation);
app.use(filterMiddleware);
app.use("/api", apiRouter);

const start = async () => {
  try {
    await connectionDb.sync();
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
