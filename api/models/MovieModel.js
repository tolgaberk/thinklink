const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = Schema({
  title: { type: String },
  genre: [{ type: String }],
  image: { type: String },
  creator: { type: String },
  year: { type: Number },
});
const MovieModel = mongoose.model("movie", MovieSchema);

module.exports = MovieModel;
