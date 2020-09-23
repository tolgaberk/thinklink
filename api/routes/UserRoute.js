const express = require("express");
const UserController = require("../controllers/UserController");
const UserRoute = express.Router();

UserRoute.get("/", UserController.getUser);
UserRoute.get("/:userid", UserController.getOneUser);
UserRoute.post("/", UserController.createUser);
UserRoute.delete("/", UserController.deleteUser);
UserRoute.put("/:userid", UserController.updateUser);

module.exports = UserRoute;
