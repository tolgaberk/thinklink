const { isValidObjectId } = require("mongoose");
const returnInvalidObjectIdError = require("../helpers/returnWithInvalidObjectId");
const MovieModel = require("../models/MovieModel");
const MovieController = {
  createMovie: async function (req, res, next) {
    const { title, genre, image, creator, year } = req.body;
    const newMovie = new MovieModel({ title, genre, image, creator, year });
    newMovie
      .save()
      .then((createdMovie) =>
        res.status(200).json({ message: "success", createdMovie })
      )
      .catch((error) =>
        res.status(500).json({ message: "error", error: error.toString() })
      );
  },
  deleteMovie: async function (req, res, next) {
    const { movieId } = req.params;
    if (isValidObjectId(movieId)) {
      try {
        const movie = await MovieModel.deleteOne({
          _id: movieId,
        }).exec();
        res.status(200).json({ message: "success", movie });
      } catch (error) {
        res.status(500).json({ message: "error", error: error.toString() });
      }
    } else {
      returnInvalidObjectIdError(res);
    }
  },
  updateMovie: async function (req, res, next) {
    const { movieId } = req.params;
    if (isValidObjectId(movieId)) {
      try {
        const movie = await MovieModel.updateOne(
          {
            _id: movieId,
          },
          req.body
        ).exec();
        res.status(200).json({ message: "success", movie });
      } catch (error) {
        res.status(500).json({ message: "error", error: error.toString() });
      }
    } else {
      returnInvalidObjectIdError(res);
    }
  },
  getMovie: async function (req, res, next) {
    try {
      const movies = await MovieModel.find({}).exec();
      res.status(200).json({ message: "success", movies });
    } catch (error) {
      res.status(500).json({ message: "error", error: error.toString() });
    }
  },
  getOneMovie: async function (req, res, next) {
    const { movieId } = req.params;
    if (isValidObjectId(movieId)) {
      try {
        const movie = await MovieModel.findOne({
          _id: movieId,
        }).exec();
        res.status(200).json({ message: "success", movie });
      } catch (error) {
        res.status(500).json({ message: "error", error: error.toString() });
      }
    } else {
      returnInvalidObjectIdError(res);
    }
  },
};

module.exports = MovieController;
