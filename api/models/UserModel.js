const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  gender: { type: String },
  DateOfBirth: { type: Date, required: true },
  nickname: { type: String },
  profileImage: { type: String },
  nation: { type: String },
  lastReadBooks: [{ type: Schema.Types.ObjectId, ref: "book" }],
  lastWatchedMovies: [{ type: Schema.Types.ObjectId, ref: "movie" }],
  lastWatchedSeries: [{ type: Schema.Types.ObjectId, ref: "serie" }],
  favoriteBooks: [{ type: Schema.Types.ObjectId, ref: "book" }],
  favoriteSeries: [{ type: Schema.Types.ObjectId, ref: "book" }],
  favoriteMovies: [{ type: Schema.Types.ObjectId, ref: "book" }],
  favoriteSongGenre: { type: String },
  favoriteSinger: { type: String },
  sentMatchingRequests: { type: Number },
  receivedMatchingRequests: { type: Number },
  activeMessagingUsers: [{ type: Schema.Types.ObjectId, ref: "user" }],
});
const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
