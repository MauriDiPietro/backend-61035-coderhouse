import UserDao from "../daos/user.dao.js";
import { UserModel } from "../daos/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
const userDao = new UserDao(UserModel);

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.login(email);
    if (!user) res.status(401).json({ msg: "Autenticación fallida" });
    //res.redirect('/error-login)
      if(isValidPassword(password, user)){
        req.session.email = email;
        req.session.password = user.password;
        res.redirect("/profile");
      } else
      res.status(401).json({ msg: "Autenticación fallida" });
  } catch (error) {
    throw new Error(error);
  }
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      const user = await userDao.register({
        ...req.body,
        password: createHash(password),
        role: "admin",
      });
      if (!user) res.status(401).json({ msg: "user exist!" });
      else res.redirect("/login");
    }
    const user = await userDao.register({
      ...req.body,
      password: createHash(password)
    });
    if (!user) res.status(401).json({ msg: "user exist!" });
    else res.redirect("/login");
  } catch (error) {
    throw new Error(error);
  }
};

export const visit = (req, res) => {
  req.session.info && req.session.info.contador++;
  res.json({
    msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces`,
  });
};

export const infoSession = (req, res) => {
  res.json({
    session: req.session,
    sessionId: req.sessionID,
    cookies: req.cookies,
  });
};

export const logout = (req, res) => {
  req.session.destroy();
  res.send("session destroy");
};
