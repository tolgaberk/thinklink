const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: [{ type: String }],
    literature: { type: String },
  },
  { timestamps: true }
);
const BookModel = mongoose.model("book", BookSchema);

module.exports = BookModel;
