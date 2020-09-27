const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeriesSchema = Schema(
  {
    title: { type: String },
    genre: [{ type: String }],
    image: { type: String },
    creator: { type: String },
    imdbScore: { type: Number },
  },
  { timestamps: true }
);
const SerieModel = mongoose.model("serie", SeriesSchema);

module.exports = SerieModel;
