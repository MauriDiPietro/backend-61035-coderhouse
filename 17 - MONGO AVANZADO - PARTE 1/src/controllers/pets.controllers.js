import * as service from "../services/pets.services.js";

export const getByIdPet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pet = await service.getByIdPet(id);
    if (!pet) res.status(404).json({ msg: "pet not found" });
    res.json(pet);
  } catch (error) {
    next(error);
  }
};

export const createPet = async (req, res, next) => {
  try {
    const pet = { ...req.body };
    const newPet = await service.createPet(pet);
    if (!newPet) res.status(404).json({ msg: "error create pet" });
    else res.json(newPet);
  } catch (error) {
    next(error);
  }
};
