//@ts-check
// enable browser console
require("node-monkey")({
  server: { attachOnStart: true },
  dataDir: "./nodemonkey",
  silent: true,
});

// enable reading from dotenv
require("dotenv").config();

const { applyMiddleWares } = require("./src/middlewares");
const useRoutes = require("./src/routes");
const mongoose = require("mongoose");
const getEnv = require("./src/helpers/getEnv");

mongoose.connect(getEnv("MONGO_DB_URI"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = require("express")();

applyMiddleWares(app);

useRoutes(app);

app.listen(getEnv("PORT") || 3000, () => {
  console.log(`Listening on ${getEnv("PORT") || 3000}`);
});
