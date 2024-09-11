import { Request, Response } from "express";
import { logger } from "../logs/logger";
import httpResponse from "../utils/http.response";

export const errorHandler = (error: Error, req: Request, res: Response) => {
  logger.error({
    name: error.name,
    message: error.message,
    url: req.url,
  });
  return httpResponse.ServerError(res, error, req.url);
};
