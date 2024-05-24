import * as service from "../services/product.services.js";

export const getAll = async (req, res, next) => {
  try {
    const response = await service.getAll();
    res.json(response);
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prod = await service.getById(id);
    if(!prod) res.status(404).json({msg: 'product not found'});
    else res.json(prod);
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const newProd = await service.create(req.body);
    if(!newProd) res.status(404).json({msg: 'Error creating product'});
    else res.json(newProd);
  } catch (error) {
    next(error.message);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodUpd = await service.update(id, req.body);
    if(!prodUpd) res.status(404).json({msg: 'Error update product'});
    else res.json(prodUpd);
  } catch (error) {
    next(error.message);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodDel = await service.remove(id);
    if(!prodDel) res.status(404).json({msg: 'Error remove product'});
    else res.json(prodDel);
  } catch (error) {
    next(error.message);
  }
};
