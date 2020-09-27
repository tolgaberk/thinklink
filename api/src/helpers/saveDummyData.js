const MusicModel = require("../models/MusicModel");
const musics = require("../../dummy_data/musics");
const books = require("../../dummy_data/books");
const BookModel = require("../models/BookModel");
const SerieModel = require("../models/SerieModel");
const series = require("../../dummy_data/series");
const movies = require("../../dummy_data/movies");
const MovieModel = require("../models/MovieModel");
const Dummies = {
  saveAll: function () {
    saveDummyMusics();
    saveDummyBooks();
    saveDummySeries();
    saveDummyMovies();
  },
  saveBooks: saveDummyBooks,
};
module.exports = Dummies;
function saveDummyMovies() {
  for (const movie of movies) {
    const toBeSavedMovie = new MovieModel(movie);
    toBeSavedMovie.save();
  }
}

function saveDummySeries() {
  for (const serie of series) {
    const toBeSavedSerie = new SerieModel(serie);
    toBeSavedSerie.save();
  }
}

function saveDummyBooks() {
  for (const book of books) {
    const toBeSavedBook = new BookModel(book);
    toBeSavedBook.save();
  }
}

function saveDummyMusics() {
  for (const music of musics) {
    const toBeSavedMusic = new MusicModel(music);
    toBeSavedMusic.save();
  }
}
