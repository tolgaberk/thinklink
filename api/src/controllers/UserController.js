//@ts-check
const NOT_IMPLEMENTED = require("../helpers/notImplemented");
const populateUser = require("../helpers/populateUser");
const UserModel = require("../models/UserModel");
const Bcrypt = require("bcrypt");
const getEnv = require("../helpers/getEnv");
const ErrorCodes = require("../helpers/errors");
const { generateJWT } = require("../helpers/JWT");
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
      const token = generateJWT({ user, email });
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
  login: async function (req, res, next) {
    const { email, password } = req.body;
    try {
      const dbUser = await UserModel.findOne({ email }).exec();
      if (!dbUser)
        return res.status(403).json({
          message: "error",
          error: "AUTH FAILED",
          errorCode: ErrorCodes.MAIL_NOT_FOUND,
        });

      const token = generateJWT({ user: dbUser, email });
      dbUser.token = token;
      dbUser.save();
      const willReturnUser = mapDbUserToUser(dbUser);
      if (!Bcrypt.compareSync(password, dbUser.password))
        return res.status(403).json({
          message: "error",
          error: "AUTH FAILED",
          errorCode: ErrorCodes.WRONG_PASSWORD,
        });

      return res.status(200).json({ message: "success", user: willReturnUser });
    } catch (error) {
      if (getEnv("NODE_ENV") !== "production") {
        res.status(500).json({
          message: "error",
          error: error.toString(),
          errorCode: ErrorCodes.UNKNOWN_ERROR,
        });
      } else {
        res.status(500).json({
          message: "error",
          errorCode: ErrorCodes.SOME_LOGIN_ERROR,
        });
      }
    }
  },
  logout: async function (req, res, next) {
    const { userId } = req.params;
    try {
      await UserModel.findOne({ _id: userId })
        .update({ token: null, isLoggedIn: false })
        .exec();
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorCode: ErrorCodes.SOME_LOGOUT_ERROR,
      });
    }
  },
  getOneByEmail: async function (req, res) {
    const { email } = req.params;
    const user = await populateUser(UserModel.findOne({ email })).exec();
    res.status(200).json(user);
  },
};

function mapDbUserToUser(dbUser) {
  const {
    isPremium,
    profileImage,
    lastReadBooks,
    lastWatchedMovies,
    lastWatchedSeries,
    favoriteBooks,
    favoriteMovies,
    favoriteSeries,
    activeMessagingUsers,
    name,
    email,
    dateOfBirth,
    phone,
    gender,
    token,
    nickname,
    _id,
  } = dbUser;
  return {
    userid: _id,
    isPremium,
    profileImage,
    lastReadBooks,
    lastWatchedMovies,
    lastWatchedSeries,
    favoriteBooks,
    favoriteMovies,
    favoriteSeries,
    activeMessagingUsers,
    name,
    email,
    dateOfBirth,
    phone,
    gender,
    token,
    nickname,
  };
}

module.exports = UserController;
