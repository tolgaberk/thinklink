const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeriesSchema = Schema({
  title: { type: String },
  genre: [{ type: String }],
  image: { type: String },
  creator: { type: String },
  imdb_score: { type: Number },
});
const SerieModel = mongoose.model("serie", SeriesSchema);

module.exports = SerieModel;
