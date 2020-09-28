const express = require("express");
const MusicController = require("../controllers/MusicController");
const MusicRoute = express.Router();

MusicRoute.get("/", MusicController.getMusic);
MusicRoute.get("/:musicId", MusicController.getOneMusic);
MusicRoute.post("/", MusicController.createMusic);
MusicRoute.delete("/:musicId", MusicController.deleteMusic);
MusicRoute.put("/:musicId", MusicController.updateMusic);

module.exports = MusicRoute;
