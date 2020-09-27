const express = require("express");
const UserFavoriteController = require("../controllers/UserFavoriteController");
const UserFavoriteRoute = express.Router();
const RouteList = [
  { routeName: "addFavoriteBook", method: "post" },
  { routeName: "addFavoriteBooks", method: "post" },
  { routeName: "addFavoriteMovie", method: "post" },
  { routeName: "addFavoriteMovies", method: "post" },
  { routeName: "addFavoriteSerie", method: "post" },
  { routeName: "addFavoriteSeries", method: "post" },
  { routeName: "addToLastReadBooks", method: "post" },
  { routeName: "addToLastWatchedMovies", method: "post" },
  { routeName: "addToLastWatchedSeries", method: "post" },
  { routeName: "removeFavoriteBook", method: "post" },
  { routeName: "removeFavoriteMovie", method: "post" },
  { routeName: "removeFavoriteSerie", method: "post" },
  { routeName: "removeFromLastReadBooks", method: "post" },
  { routeName: "removeFromLastWatchedMovies", method: "post" },
  { routeName: "removeFromLastWatchedSeries", method: "post" },
];
RouteList.map(({ routeName, method }) =>
  registerRoute(UserFavoriteRoute, UserFavoriteController, method, routeName)
);

function registerRoute(route, controller, method, routeName) {
  route[method](`/${routeName}`, controller[routeName]);
}
module.exports = UserFavoriteRoute;
