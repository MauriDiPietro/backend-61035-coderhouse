import { ProductModel } from "../models/product.model.js";

export const getAll = async()=>{
    try {
        return await ProductModel.findAll();
        // return await ProductModel.findAll({
        //     attributes: ['name']
        // });
    } catch (error) {
        throw new Error(error);
    }
}

export const getById = async(id)=>{
    try {
        return await ProductModel.findOne({
            where: {
                id: id
            }
        });
    } catch (error) {
        throw new Error(error);
    }
};

export const create = async(prod)=>{
    try {
        return await ProductModel.create(prod);
    } catch (error) {
        throw new Error(error);
    }
}

export const update = async(id, body)=>{
    try {
        return await ProductModel.update(body, {
            where: {
                id: id
            }
        })
    } catch (error) {
        throw new Error(error);
    }
}

export const remove = async(id)=>{
    try {
        return await ProductModel.destroy({
            where: {
                id: id
            }
        });
    } catch (error) {
        throw new Error(error);
    }
}