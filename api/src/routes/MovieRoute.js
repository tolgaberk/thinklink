const express = require("express");
const MovieController = require("../controllers/MovieController");
const MovieRoute = express.Router();

MovieRoute.get("/", MovieController.getMovie);
MovieRoute.get("/:movieid", MovieController.getOneMovie);
MovieRoute.post("/", MovieController.createMovie);
MovieRoute.delete("/", MovieController.deleteMovie);
MovieRoute.put("/:movieid", MovieController.updateMovie);
module.exports = MovieRoute;
