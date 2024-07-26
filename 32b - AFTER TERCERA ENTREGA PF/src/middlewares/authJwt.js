import jwt from 'jsonwebtoken';
import UserService from '../services/user.services.js';
const userService = new UserService();
import 'dotenv/config'
import { createResponse } from '../utils.js';

/**
 * Middleware que verifica si el token es válido a través de la cookie 'token'
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const checkAuth = async (req, res, next) => {
  try {
    // console.log(req.cookies)
    const token = req.cookies.token
    if (!token) return res.status(401).json({ msg: "Unhautorized" });
    const decode = jwt.verify(token, process.env.SECRET_KEY_JWT);
    const user = await userService.getById(decode.userId);
    if (!user) res.status(404).json({ msg: "User not found" });
    //REFRESH TOKEN
    const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    const tokenExp = decode.exp; // Tiempo de expiración del token
    const timeUntilExp = tokenExp - now; // Tiempo hasta la expiración en segundos

    if (timeUntilExp <= 300) {
      // 300 segundos = 5 minutos
      // Generar un nuevo token con un tiempo de expiración renovado
      const newToken = await userService.generateToken(user, "5m");
      console.log(">>>>>>SE REFRESCÓ EL TOKEN");
      res.cookie('token', newToken, { httpOnly: true }) // Agregar el nuevo token a la cookie
    }
    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
};

