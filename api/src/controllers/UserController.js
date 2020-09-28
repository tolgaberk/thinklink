const NOT_IMPLEMENTED = require("../helpers/notImplemented");
const populateUser = require("../helpers/populateUser");
const UserModel = require("../models/UserModel");
const JWT = require("jsonwebtoken");
const Bcrypt = require("bcrypt");
const getEnv = require("../helpers/getEnv");
const UserController = {
  createUser: async function (req, res, next) {
    try {
      const {
        name,
        email,
        password,
        dateOfBirth,
        phone,
        gender,
        nickname,
      } = req.body;
      const salt = await Bcrypt.genSalt(parseInt(getEnv("SALT_ROUNDS")));
      const hashedPassword = await Bcrypt.hash(password, salt);
      const user = new UserModel({
        name,
        email,
        password: hashedPassword,
        dateOfBirth,
        phone,
        gender,
        nickname,
        isLoggedIn: true,
      });
      console.log({ user });
      const token = JWT.sign({ id: user._id }, getEnv("JWT_SECRET"));
      user.set("token", token);
      const createdUser = await user.save();
      res.status(200).json({ message: "success", createdUser });
    } catch (error) {
      res.status(500).json({ message: "error", error: error.toString() });
    }
  },
  deleteUser: async function (req, res, next) {
    try {
      const result = await UserModel.deleteOne({
        email: req.params.email,
      }).exec();
      res.status(200).json({ message: "success", result });
    } catch (error) {
      res.status(500).json({ message: "error", error: error.toString() });
    }
  },
  updateUser: NOT_IMPLEMENTED,
  getUsers: async function (req, res, next) {
    const users = await UserModel.find({}).exec();
    res.status(200).json(users);
  },
  getOneUser: async function (req, res, next) {
    const { userId } = req.params;
    const user = await populateUser(UserModel.findById(userId)).exec();
    res.status(200).json(user);
  },
  login: NOT_IMPLEMENTED,
  logout: NOT_IMPLEMENTED,
};

module.exports = UserController;
