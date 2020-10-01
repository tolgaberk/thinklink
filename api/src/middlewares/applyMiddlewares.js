const bodyParser = require("body-parser");
const morgan = require("morgan");
const express = require("express");

const applyMiddleWares = (app) => {
  app.use(morgan("tiny"));
  app.use(express.static("test"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};

module.exports = applyMiddleWares;
