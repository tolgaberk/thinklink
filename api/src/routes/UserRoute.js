const express = require("express");
const UserController = require("../controllers/UserController");
const { authMiddleware } = require("../middlewares");
const UserFavoriteRoute = require("./UserFavoriteRoute");
const UserRoute = express.Router();

UserRoute.get("/", authMiddleware, UserController.getUsers);
UserRoute.get("/logout/:userId", authMiddleware, UserController.logout);
UserRoute.get("/oneById/:userId", UserController.getOneUser);
UserRoute.get("/oneByMail/:email", UserController.getOneByEmail);
UserRoute.post("/", UserController.createUser);
UserRoute.post("/login", UserController.login);
UserRoute.delete("/:email", authMiddleware, UserController.deleteUser);
UserRoute.put("/:userId", authMiddleware, UserController.updateUser);

UserRoute.use(UserFavoriteRoute);
module.exports = UserRoute;
