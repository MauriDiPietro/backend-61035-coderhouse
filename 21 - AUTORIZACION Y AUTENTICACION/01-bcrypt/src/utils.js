import { dirname } from "path";
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));

/* ------------------------------------ - ----------------------------------- */

import bcryptjs from "bcryptjs";

/**
 * Funcion que realiza el hasheo de contraseña a través de bcryptjs con el método hashSync
 * @param {*} password tipo String
 * @returns password hasheada
 */
export const createHash = (password) => bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))

/**
 * Funcion que compara password en string plano con password hasheada del usuario
 * @param {*} password tipo string
 * @param {*} user usuario existente en base de datos
 * @returns boolean
 */
export const isValidPassword = (password, user) => bcryptjs.compareSync(password, user.password);
