const populateUser = (userObj) =>
  userObj
    .populate("lastReadBooks")
    .populate("lastWatchedMovies")
    .populate("lastWatchedSeries")
    .populate("favoriteBooks")
    .populate("favoriteSeries")
    .populate("favoriteMovies");

module.exports = populateUser;
