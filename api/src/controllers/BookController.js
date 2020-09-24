const NOT_IMPLEMENTED = require("../helpers/notImplemented");
const BookModel = require("../models/BookModel");
const BookController = {
  createBook: function (req, res, next) {
    console.log(req.body);
    const { title, author, genre, nationality } = req.body;
    const newBook = new BookModel({ title, author, genre, nationality });
    newBook
      .save()
      .then((_) => res.status(200).json({ message: "Success" }))
      .catch((e) => res.status(500).json({ e, message: "Error" }));
  },
  deleteBook: NOT_IMPLEMENTED,
  updateBook: NOT_IMPLEMENTED,
  getBook: function (req, res, next) {
    BookModel.find({})
      .exec()
      .then((books) => res.status(200).json({ books }))
      .catch((e) => res.status(404).json({ e }));
  },
  getOneBook: function (req, res, next) {
    BookModel.findOne({ _id: req.params.bookid })
      .exec()
      .then((book) => res.status(200).json({ book }))
      .catch((e) => res.status(404).json({ e }));
  },
};

module.exports = BookController;
