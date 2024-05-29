import * as service from "../services/users.services.js";

export const createFileCtr = async (req, res, next) => {
  try {
    const newUsers = await service.createFileUser();
    if (!newUsers) res.status(404).json({ msg: "error create users" });
    else res.json({masg: `${newUsers} Users created ok`});
  } catch (error) {
    next(error);
  }
};

export const addPetToUser = async(req, res, next) => {
  try {
    const { idUser } = req.params;
    const { idPet } = req.params;
    const response = await service.addPetToUser(idUser, idPet);
    if(!response) res.status(404).json({msg: 'error add pet to user'});
    else res.json(response);
  } catch (error) {
    next(error);
  }
}

export const getByNameCtr = async (req, res, next) => {
  try {
    const { name } = req.query;
    const user = await service.getByNameUser(name);
    if (!user) res.status(404).json({ msg: "User not found!" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getByIdCtr = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.getByIdUser(id);
    if (!user) res.status(404).json({ msg: "User not found!" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getByEmailCtr = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await service.getByEmailUser(email);
    if (!user) res.status(404).json({ msg: "User not found!" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllCtr = async (req, res, next) => {
  try {
    const users = await service.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const createCtr = async (req, res, next) => {
  try {
    const user = { ...req.body };
    const newUser = await service.createUser(user);
    if (!newUser) res.status(404).json({ msg: "error create user" });
    else res.json(newUser);
  } catch (error) {
    next(error);
  }
};

export const updateCtr = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userUpdated = await service.updateUser(id, req.body);
    if (!userUpdated) res.status(404).json({ msg: "error update user" });
    res.json(userUpdated);
  } catch (error) {
    next(error);
  }
};

export const deleteCtr = async (req, res, next) => {
  try {
    const { id } = req.params;

    await service.deleteUser(id);

    res.json({
      msg: "User deleted",
    });
  } catch (error) {
    next(error);
  }
};
