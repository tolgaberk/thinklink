//@ts-check
// enable browser console
require("node-monkey")({
  server: { attachOnStart: true },
  dataDir: "./nodemonkey",
  silent: true,
});

// enable reading from dotenv
require("dotenv").config();

const applyMiddleWares = require("./src/middlewares");
const useRoutes = require("./src/routes");
const mongoose = require("mongoose");
const musics = require("./dummy_data/musics");
const MusicModel = require("./src/models/MusicModel");

mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = require("express")();

applyMiddleWares(app);

useRoutes(app);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on ${process.env.PORT || 3000}`);
});
