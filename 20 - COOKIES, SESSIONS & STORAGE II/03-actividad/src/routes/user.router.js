import { Router } from "express";
const router = Router();
import {
  login,
  logout,
  visit,
  infoSession,
  register,
} from "../controllers/user.controller.js";
import { validateLogin } from "../middlewares/validateLogin.js";

router.post("/login", login);
router.post('/register', register)
router.get("/info", validateLogin, infoSession);
router.get("/secret-endpoint", validateLogin, visit);
router.post("/logout", logout);

export default router;
