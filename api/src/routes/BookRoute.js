const express = require("express");
const BookController = require("../controllers/BookController");
const BookRoute = express.Router();

BookRoute.get("/", BookController.getBook);
BookRoute.get("/:bookid", BookController.getOneBook);
BookRoute.post("/", BookController.createBook);
BookRoute.delete("/", BookController.deleteBook);
BookRoute.put("/:bookid", BookController.updateBook);
module.exports = BookRoute;
