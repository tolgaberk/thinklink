const { isValidObjectId } = require("mongoose");
const NOT_IMPLEMENTED = require("../helpers/notImplemented");
const returnInvalidObjectIdError = require("../helpers/returnWithInvalidObjectId");
const MusicModel = require("../models/MusicModel");
const MusicController = {
  createMusic: async function (req, res, next) {
    try {
      const { title, image, genre, artist, album } = req.body;
      const newMusic = new MusicModel({ title, image, genre, artist, album });
      const createdMusic = await newMusic.save();
      res.status(200).json({ message: "success", createdMusic });
    } catch (error) {
      res.status(500).json({ message: "error", error: error.toString() });
    }
  },
  deleteMusic: async function (req, res, next) {
    const { musicId } = req.params;
    if (isValidObjectId(musicId)) {
      try {
        const result = await MusicModel.deleteOne({ _id: musicId }).exec();
        res.status(200).json({ message: "success", result });
      } catch (error) {
        res.status(200).json({ message: "error", error: error.toString() });
      }
    } else {
      returnInvalidObjectIdError(res);
    }
  },
  updateMusic: async function (req, res, next) {
    const { musicId } = req.params;
    if (isValidObjectId(musicId)) {
      try {
        const result = await MusicModel.updateOne(
          { _id: musicId },
          req.body
        ).exec();
        res.status(200).json({ message: "success", result });
      } catch (error) {
        res.status(200).json({ message: "error", error: error.toString() });
      }
    } else {
      returnInvalidObjectIdError(res);
    }
  },
  getMusic: async function (req, res, next) {
    try {
      const musics = await MusicModel.find({}).exec();
      res.status(200).json({ message: "success", musics });
    } catch (error) {
      res.status(500).json({ message: "error", error: error.toString() });
    }
  },
  getOneMusic: async function (req, res, next) {
    const { musicId } = req.params;
    if (isValidObjectId(musicId)) {
      try {
        const musics = await MusicModel.findById(musicId).exec();
        res.status(200).json({ message: "success", musics });
      } catch (error) {
        res.status(500).json({ message: "error", error: error.toString() });
      }
    } else {
      returnInvalidObjectIdError(res);
    }
  },
};

module.exports = MusicController;
