const express = require("express");
const SerieController = require("../controllers/SerieController");
const SerieRoute = express.Router();

SerieRoute.get("/", SerieController.getSerie);
SerieRoute.get("/:serieid", SerieController.getOneSerie);
SerieRoute.post("/", SerieController.createSerie);
SerieRoute.delete("/", SerieController.deleteSerie);
SerieRoute.put("/:serieid", SerieController.updateSerie);

module.exports = SerieRoute;
