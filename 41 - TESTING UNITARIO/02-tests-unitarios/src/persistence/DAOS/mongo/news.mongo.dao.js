import { NewsModel } from "../../models/news.model.js";
import { logger } from "../../../logs/news.logs.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default class DaoMongo {
  static init() {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGO_URL, (err) => {
      if (err) logger.fatal(err);
      else logger.info("Conectado a MongoDB!");
    });
  }

  async getAllNews() {
    try {
      return await NewsModel.find({});
    } catch (error) {
      logger.fatal(error);
    }
  }

  async getNew(id) {
    try {
      return await NewsModel.findById(id);
    } catch (error) {
      logger.fatal(error);
    }
  }

  async createNew(obj) {
    try {
      return await NewsModel.create(obj);
    } catch (error) {
      logger.fatal(error);
    }
  }

  async updateNew(id, body) {
    try {
      return await NewsModel.findByIdAndUpdate(id, body, {
        new: true,
      });
    } catch (error) {
      logger.fatal(error);
    }
  }

  async deleteNew(id) {
    try {
      return await NewsModel.findByIdAndDelete(id);
    } catch (error) {
      logger.fatal(error);
    }
  }
}
