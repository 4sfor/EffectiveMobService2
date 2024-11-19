import { HistoryService } from "./history.service.js";
import { Router } from "express";

export class HistoryRouter {
  router = new Router();
  historyService = new HistoryService();
  constructor() {
    this.initialize();
  }

  initialize() {
    this.router.get("/", (request, response, next) =>
      this.getHistory(request, response, next),
    );
    this.router.post("/", (request, response, next) =>
      this.createHistory(request, response, next),
    );
  }

  async getHistory(request, response, next) {
    try {
      const filter = request["filterParams"];
      const result = await this.historyService.getHistory(filter);
      response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async createHistory(request, response, next) {
    try {
      const result = await this.historyService.createHistory(
        request.body["event"],
      );
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  getRouter() {
    return this.router;
  }
}
