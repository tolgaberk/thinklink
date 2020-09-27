const express = require("express");
const MovieController = require("../controllers/MovieController");
const MovieRoute = express.Router();

MovieRoute.get("/", MovieController.getMovie);
MovieRoute.get("/:movieId", MovieController.getOneMovie);
MovieRoute.post("/", MovieController.createMovie);
MovieRoute.delete("/", MovieController.deleteMovie);
MovieRoute.put("/:movieId", MovieController.updateMovie);
module.exports = MovieRoute;
