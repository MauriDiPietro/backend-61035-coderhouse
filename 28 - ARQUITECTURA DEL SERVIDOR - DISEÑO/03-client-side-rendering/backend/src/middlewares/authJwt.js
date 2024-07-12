import jwt from 'jsonwebtoken';
import UserService from '../services/user.services.js';
const userService = new UserService();
import 'dotenv/config'
import { createResponse } from '../utils.js';

/**
 * Middleware que verifica si el token es válido a través del header "Authorization"
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) return res.status(403).json({ msg: "Unhautorized" });
    const token = authHeader.split(" ")[1];
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
      const newToken = userService.generateToken(user, "5m");
      console.log(">>>>>>SE REFRESCÓ EL TOKEN");
      res.set(`Authorization`, `Bearer ${newToken}`); // Agregar el nuevo token al encabezado
    }
    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
};


