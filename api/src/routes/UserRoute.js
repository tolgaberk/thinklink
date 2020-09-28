const express = require("express");
const UserController = require("../controllers/UserController");
const UserFavoriteRoute = require("./UserFavoriteRoute");
const UserRoute = express.Router();

UserRoute.get("/", UserController.getUsers);
UserRoute.get("/logout/:userId", UserController.logout);
UserRoute.get("/:userId", UserController.getOneUser);
UserRoute.post("/", UserController.createUser);
UserRoute.post("/login", UserController.login);
UserRoute.delete("/:email", UserController.deleteUser);
UserRoute.put("/:userId", UserController.updateUser);

UserRoute.use(UserFavoriteRoute);
module.exports = UserRoute;
