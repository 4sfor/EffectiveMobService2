import { HttpError } from "../apiExeption/exeption.js";

export function errorHandlerMiddleware(err, req, res, next) {
  if (err instanceof HttpError) {
    console.error(err.stack);
    res.status(err.statusCode).send(err.message);
  } else {
    console.error(err.stack);
    res.status(500).send(err.message);
  }
}
