const { isValidObjectId } = require("mongoose");
const NOT_IMPLEMENTED = require("../helpers/notImplemented");
const returnInvalidObjectIdError = require("../helpers/returnWithInvalidObjectId");
const SerieModel = require("../models/SerieModel");
const SerieController = {
  createSerie: async function (req, res, next) {
    const { title, genre, image, creator } = req.body;
    const newSerie = new SerieModel({ title, genre, image, creator });
    newSerie
      .save()
      .then((createdSerie) =>
        res.status(200).json({ message: "success", createdSerie })
      )
      .catch((error) =>
        res.status(500).json({ message: "error", error: error.toString() })
      );
  },
  deleteSerie: async function (req, res, next) {
    if (isValidObjectId(req.params.serieId)) {
      SerieModel.deleteOne({ _id: req.params.serieId })
        .exec()
        .then((result) => res.status(200).json({ message: "success", result }))
        .catch((e) => res.status(500).json({ message: "error", error: e }));
    } else {
      returnInvalidObjectIdError(res);
    }
  },
  updateSerie: async function (req, res, next) {
    try {
      if (isValidObjectId(req.params.serieId)) {
        const updatedSerie = await SerieModel.updateOne(
          { _id: req.params.serieId },
          req.body
        ).exec();
        res.status(200).json({ message: "success", updatedSerie });
      } else {
        returnInvalidObjectIdError(res);
      }
    } catch (error) {
      res.status(500).json({ message: "error", error: error.toString() });
    }
  },
  getSerie: async function (req, res, next) {
    try {
      const series = await SerieModel.find({}).exec();
      res.status(200).json({ message: "success", series });
    } catch (error) {
      res.status(500).json({ message: "error", error: error.toString() });
    }
  },
  getOneSerie: async function (req, res, next) {
    try {
      if (isValidObjectId(req.params.serieId)) {
        const serie = await SerieModel.findById(req.params.serieId).exec();
        res.status(200).json({ message: "success", serie });
      } else {
        returnInvalidObjectIdError(res);
      }
    } catch (error) {
      res.status(500).json({ message: "error", error: error.toString() });
    }
  },
};

module.exports = SerieController;
