const express = require("express");
const MusicController = require("../controllers/SerieController");
const MusicRoute = express.Router();

MusicRoute.get("/", MusicController.getSerie);
MusicRoute.get("/:serieid", MusicController.getOneSerie);
MusicRoute.post("/", MusicController.createSerie);
MusicRoute.delete("/", MusicController.deleteSerie);
MusicRoute.put("/:serieid", MusicController.updateSerie);

module.exports = MusicRoute;
