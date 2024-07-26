import * as userService from "../services/user.service.js";

export const createUser = async (req, res) => {
  try {
    const {cant} = req.query
    res.json(await userService.createUsersMock(cant))

  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (req, res) => {
  try {
   res.json(userService.getUsers())
  } catch (error) {
    console.log(error);
  }
};


