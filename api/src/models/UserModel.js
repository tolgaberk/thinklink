const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    name: { type: String, required: true, minLength: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isPremium: { type: Boolean, required: true, default: false },
    isLoggedIn: { type: Boolean, required: true, default: false },
    dateOfBirth: { type: Date, required: true },
    phone: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    nickname: { type: String },
    profileImage: { type: String, default: "/images/defaultPP.png" },
    nation: { type: String },
    lastReadBooks: [{ type: Schema.Types.ObjectId, ref: "book" }],
    lastWatchedMovies: [{ type: Schema.Types.ObjectId, ref: "movie" }],
    lastWatchedSeries: [{ type: Schema.Types.ObjectId, ref: "serie" }],
    favoriteBooks: [{ type: Schema.Types.ObjectId, ref: "book" }],
    favoriteSeries: [{ type: Schema.Types.ObjectId, ref: "serie" }],
    favoriteMovies: [{ type: Schema.Types.ObjectId, ref: "movie" }],
    favoriteSongGenre: { type: String },
    favoriteSinger: { type: String },
    sentMatchingRequests: { type: Number },
    receivedMatchingRequests: { type: Number },
    activeMessagingUsers: [{ type: Schema.Types.ObjectId, ref: "user" }],
    token: { type: String },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
