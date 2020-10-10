//@ts-check
const getEnv = require("../getEnv");
const JWT = require("jsonwebtoken");
module.exports = function verifyJWT(token) {
  return JWT.verify(token, getEnv("JWT_SECRET"));
};
