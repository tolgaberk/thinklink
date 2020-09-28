const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeriesSchema = Schema(
  {
    title: { type: String, required: true },
    genre: [{ type: String }],
    image: { type: String, required: true },
    creator: { type: String },
    imdbScore: { type: Number },
  },
  { timestamps: true }
);
const SerieModel = mongoose.model("serie", SeriesSchema);

module.exports = SerieModel;
