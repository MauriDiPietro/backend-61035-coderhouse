import express from "express";
import UserManager from "./manager/user.manager.js";

const userManager = new UserManager("./users.json");

const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await userManager.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    // console.log(req.body);
    const user = await userManager.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.get("/users/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await userManager.getUserById(idUser);
    if (!user) res.status(404).json({ msg: "User not found" });
    else res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.put("/users/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const userUpd = await userManager.updateUser(req.body, idUser);
    if (!userUpd) res.status(404).json({ msg: "Error updating user" });
    res.status(200).json(userUpd);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.delete("/users/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const delUser = await userManager.deleteUser(idUser);
    if(!delUser) res.status(404).json({ msg: "Error delete user" });
    else res.status(200).json({msg : `User id: ${idUser} deleted successfully`})
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));
