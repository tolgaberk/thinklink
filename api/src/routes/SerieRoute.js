const express = require("express");
const SerieController = require("../controllers/SerieController");
const SerieRoute = express.Router();

SerieRoute.get("/", SerieController.getSerie);
SerieRoute.get("/:serieId", SerieController.getOneSerie);
SerieRoute.post("/", SerieController.createSerie);
SerieRoute.delete("/:serieId", SerieController.deleteSerie);
SerieRoute.put("/:serieId", SerieController.updateSerie);

module.exports = SerieRoute;
