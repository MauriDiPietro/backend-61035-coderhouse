import { NextFunction, Request, Response } from "express";
import * as services from "../services/product.service";
import httpResponse from "../utils/http.response";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await services.create(req.body);
    if (!product) return httpResponse.NotFound(res, "Error creating product");
    return httpResponse.Ok(res, product);
  } catch (error: unknown) {
    next(error as Error);
  }
};
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prods = await services.getAll();
    return httpResponse.Ok(res, prods);
  } catch (error: unknown) {
    next(error as Error);
  }
};
export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const prod = await services.getById(id);
    if (!prod) return httpResponse.NotFound(res, "Product not found");
    return httpResponse.Ok(res, prod);
  } catch (error: unknown) {
    next(error as Error);
  }
};
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const prod = await services.update(id, req.body);
    if (!prod) return httpResponse.NotFound(res, "Product not found");
    return httpResponse.Ok(res, prod);
  } catch (error: unknown) {
    next(error as Error);
  }
};
export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const prod = await services.remove(id);
    if (!prod) return httpResponse.NotFound(res, "Product not found");
    return httpResponse.Ok(res, "product delete ok");
  } catch (error: unknown) {
    next(error as Error);
  }
};
