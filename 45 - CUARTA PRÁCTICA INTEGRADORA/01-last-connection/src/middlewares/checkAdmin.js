import { createResponse } from '../utils.js'

export const checkAdmin = async (req, res, next) => {
  try {
    //   console.log(req.user)
    const { role } = req.user;
    if (role !== "admin") createResponse(res, 401, "Este endpoint es para usuarios administradores" )
    else next();
  } catch (error) {
    next(error);
  }
};
