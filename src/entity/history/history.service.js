import { History } from "../../models/historyProduct.model.js";
import { Op } from "sequelize";
import { BadRequest } from "../../apiExeption/exeption.js";

export class HistoryService {
  historyModels;
  constructor() {
    this.historyModels = History;
  }

  async getHistory(filter) {
    try {
      const searchObj = {
        where: {
          [Op.and]: [],
        },
        attributes: ["uuid", "shopUid", "action", "plu"],
      };
      const singleFilter = ["plu", "shopUid", "action"];
      const diapasonFilter = ["createdAt"];
      for (const key in filter) {
        if (diapasonFilter.includes(key)) {
          searchObj["where"][Op.and].push({
            [key]: { [Op.between]: filter[key] },
          });
        } else if (singleFilter.includes(key)) {
          searchObj["where"][Op.and].push({
            [key]: filter[key],
          });
        }
      }
      return await this.historyModels.findAll(searchObj);
    } catch (er) {
      throw new BadRequest(er);
    }
  }

  async createHistory(body) {
    try {
      return await this.historyModels.create(body);
    } catch (error) {
      throw new BadRequest(error);
    }
  }
}
