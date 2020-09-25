const axios = require("axios");
const fs = require("fs");
const movieJson = require("./moviesList2.json");
const PAGE_LIMIT = 420;

const pageArray = new Array(PAGE_LIMIT)
  .fill("")
  .map((item, index) => index + 1);

const downloadedMovies = [];
const errors = [];

const downloadedPages = [];
async function main() {
  //   try {
  //     const {
  //       data: {
  //         data: { movies },
  //       },
  //     } = await axios.get(
  //       "https://yts.mx/api/v2/list_movies.json?limit=50&page=" + 179
  //     );
  //     movies.map(movieMapper).map((item) => movieJson.push(item));
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   fs.writeFileSync("./moviesList2.json", JSON.stringify(movieJson, null, 2));
}
main();

function downloadPage(page, fromRetry) {
  fromRetry && console.log("RETRYING FOR => " + page);
  axios
    .get("https://yts.mx/api/v2/list_movies.json?limit=50&page=" + page)
    .then(saveMovie(page))
    .catch(erroredMovie(page));
}

function erroredMovie(page) {
  return (e) => {
    console.log("ERROR WHILE DOWNLOADING PAGE => " + page);
    page === 1 && console.log(e);
    errors.push({ page, e });
  };
}

function saveMovie(page) {
  return ({
    data: {
      data: { movies },
    },
  }) => {
    movies.map(movieMapper);
    console.log(
      "\n\nDOWNLOADED PAGE => " +
        page +
        "\tDOWNLOADED MOVIE COUNT => " +
        downloadedMovies.length +
        "\tDOWNLOADED PAGE COUNT => " +
        downloadedPages.length +
        "\nERRORED PAGES COUNT => " +
        errors.length +
        "\n\n"
    );
    downloadedPages.push(page);
    if (downloadedPages.length + errors.length === pageArray.length) {
      retryErroredOnes();
    }
    if (downloadedPages.length === pageArray.length) {
      fs.writeFileSync("./moviesList2.json", JSON.stringify(movies, null, 2));
      fs.writeFileSync(
        "./moviesErrorList.json",
        JSON.stringify(errors, null, 2)
      );
    }
  };
}

function retryErroredOnes() {
  while (errors.length !== 0) {
    console.log("\nretry => " + errors[0]);
    downloadPage(errors[0].page, true);
    errors = errors.filter((error) => error.page !== errors[0].page);
  }
}

function movieMapper({
  title,
  year,
  id,
  rating,
  genres,
  language,
  runtime,
  title_long,
  background_image,
  background_image_original,
  small_cover_image,
  medium_cover_image,
  large_cover_image,
}) {
  // downloadedMovies.push({
  //   title,
  //   yts_id: id,
  //   title_long,
  //   year,
  //   rating,
  //   genres,
  //   language,
  //   runtime,
  //   background_image,
  //   background_image_original,
  //   small_cover_image,
  //   medium_cover_image,
  //   large_cover_image,
  // });
  return {
    title,
    yts_id: id,
    title_long,
    year,
    rating,
    genres,
    language,
    runtime,
    background_image,
    background_image_original,
    small_cover_image,
    medium_cover_image,
    large_cover_image,
  };
}
