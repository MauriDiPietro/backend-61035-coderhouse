import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

export const checkAdmin = async (req, res, next) => {
  try {
    //   console.log(req.user)
    const { role } = req.user;
    if (role !== "admin") return httpResponse.Unauthorized(res, "Este endpoint es para usuarios administradores") 
    else next();
  } catch (error) {
    next(error);
  }
};
