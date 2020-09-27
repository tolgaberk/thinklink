const express = require("express");
const MatchController = require("../controllers/MatchController");
const MatchRoute = express.Router();

MatchRoute.get("/", MatchController.getMatches);
MatchRoute.get("/:matchid", MatchController.getOneMatch);
MatchRoute.post("/", MatchController.createMatch);
MatchRoute.delete("/", MatchController.deleteMatch);
MatchRoute.put("/:matchid", MatchController.updateMatch);

module.exports = MatchRoute;
