import { Router } from "express";
import { HistoryRouter } from "./entity/history/history.router.js";

const apiRouter = Router();
const historyRouter = new HistoryRouter();

apiRouter.use("/history", historyRouter.getRouter());
export default apiRouter;
