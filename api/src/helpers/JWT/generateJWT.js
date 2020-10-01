//@ts-check
const getEnv = require("../getEnv");
const JWT = require("jsonwebtoken");
module.exports = function generateJWT({ user, email }) {
  return JWT.sign({ id: user._id, email: email }, getEnv("JWT_SECRET"), {
    expiresIn: "100d",
  });
};
