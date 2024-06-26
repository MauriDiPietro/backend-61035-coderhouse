import * as services from "../services/user.services.js";

export const registerResponse = (req, res, next) => {
  try {
    res.json({
      msg: 'Register OK',
      session: req.session
    })
  } catch (error) {
    next(error);
  }
};

export const loginResponse = async (req, res, next) => {
  //req.session.passport.user
  try {
    let id = null;
    if(req.session.passport && req.session.passport.user) id = req.session.passport.user;
    const user = await services.getUserById(id);
    if(!user) res.status(401).json({ msg: 'Error de autenticacion' });
    const { first_name, last_name, email, age, role } = user;
    res.json({
      msg: 'LOGIN OK!',
      user: {
        first_name,
        last_name,
        email,
        age,
        role
      }
    })
  } catch (error) {
    next(error);
  }
};
