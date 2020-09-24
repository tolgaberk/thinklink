const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: [{ type: String }],
  nationality: { type: String },
});
const BookModel = mongoose.model("book", BookSchema);

module.exports = BookModel;
