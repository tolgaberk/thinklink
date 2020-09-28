const express = require("express");
const BookController = require("../controllers/BookController");
const BookRoute = express.Router();

BookRoute.get("/", BookController.getBook);
BookRoute.get("/:bookId", BookController.getOneBook);
BookRoute.post("/", BookController.createBook);
BookRoute.delete("/:bookId", BookController.deleteBook);
BookRoute.put("/:bookId", BookController.updateBook);
module.exports = BookRoute;
