const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MusicSchema = Schema({
  title: { type: String },
  genre: [{ type: String }],
  image: { type: String },
  artist: { type: String },
  album: { type: String },
});
const MusicModel = mongoose.model("music", MusicSchema);

module.exports = MusicModel;
