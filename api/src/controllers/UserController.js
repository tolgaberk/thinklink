const NOT_IMPLEMENTED = require("../helpers/notImplemented");
const populateUser = require("../helpers/populateUser");
const UserModel = require("../models/UserModel");
const UserController = {
  createUser: function (req, res, next) {
    const user = new UserModel(req.body);
    user
      .save()
      .then((_) => res.json(user))
      .catch((e) => res.json(e));
  },
  deleteUser: NOT_IMPLEMENTED,
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
