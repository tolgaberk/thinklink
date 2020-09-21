const monkey = require("node-monkey")({ server: { attachOnStart: true } });
const express = require("express");
const app = require("express")();
const server = require("http").Server(app);
const morgan = require("morgan");
const socket = require("socket.io");
const io = socket(server);

app.use(morgan("tiny"));
app.use(express.static("test"));

server.listen(80, "0.0.0.0");

io.on("connection", (socket) => {
  console.log(socket.id);
});
