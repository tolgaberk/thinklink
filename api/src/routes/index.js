const BookRoute = require("./BookRoute");
const MatchRoute = require("./MatchRoute");
const MovieRoute = require("./MovieRoute");
const MusicRoute = require("./MusicRoute");
const SerieRoute = require("./SerieRoute");
const UserRoute = require("./UserRoute");

const useRoutes = function (app) {
  app.use("/user", UserRoute);
  app.use("/book", BookRoute);
  app.use("/movie", MovieRoute);
  app.use("/serie", SerieRoute);
  app.use("/music", MusicRoute);
  app.use("/match", MatchRoute);
};

module.exports = useRoutes;
