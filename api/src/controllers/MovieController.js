const NOT_IMPLEMENTED = require("../helpers/notImplemented");
const MovieModel = require("../models/MovieModel");
const MovieController = {
  createMovie: NOT_IMPLEMENTED,
  deleteMovie: NOT_IMPLEMENTED,
  updateMovie: NOT_IMPLEMENTED,
  getMovie: function (req, res, next) {
    MovieModel.find({})
      .exec()
      .then((docs) => res.status(200).json(docs));
  },
  getOneMovie: function (req, res, next) {
    MovieModel.findOne({ _id: req.params.movieId })
      .exec()
      .then((docs) => res.status(200).json(docs));
  },
};

module.exports = MovieController;
