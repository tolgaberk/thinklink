const { isValidObjectId } = require("mongoose");
const returnInvalidObjectIdError = require("../helpers/returnWithInvalidObjectId");
const BookModel = require("../models/BookModel");
const BookController = {
  createBook: function (req, res, next) {
    console.log(req.body);
    const { title, author, genre, nationality } = req.body;
    const newBook = new BookModel({ title, author, genre, nationality });
    newBook
      .save()
      .then((obj) =>
        res.status(200).json({ message: "Success", createdBook: obj })
      )
      .catch((e) => res.status(500).json({ e, message: "Error" }));
  },
  deleteBook: async function (req, res, next) {
    if (isValidObjectId(req.params.bookId)) {
      const relatedBook = await BookModel.findById(req.params.bookId).exec();
      try {
        relatedBook.deleteOne();
        res
          .status(200)
          .json({ message: "success", relatedBookId: req.params.bookId });
      } catch (error) {
        res.status(500).json({ message: "error", error: error.toString() });
      }
    } else {
      returnInvalidObjectIdError(res);
    }
  },
  updateBook: async function (req, res, next) {
    if (isValidObjectId(req.params.bookId)) {
      try {
        const relatedBook = await BookModel.updateOne(
          { _id: req.params.bookId },
          req.body
        ).exec();
        res.status(200).json({ relatedBook });
      } catch (error) {
        res.status(500).json({ message: "error", error: error.toString() });
      }
    } else {
      returnInvalidObjectIdError(res);
    }
  },
  getBook: function (req, res, next) {
    BookModel.find({})
      .exec()
      .then((books) => res.status(200).json({ books }))
      .catch((e) => res.status(500).json({ e }));
  },
  getOneBook: function (req, res, next) {
    if (isValidObjectId(req.params.bookId)) {
      BookModel.findById(req.params.bookId)
        .exec()
        .then((book) => res.status(200).json({ book }))
        .catch((e) => res.status(500).json({ e }));
    } else {
      returnInvalidObjectIdError(res);
    }
  },
};

module.exports = BookController;
