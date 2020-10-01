//@ts-check
const getEnv = require("../getEnv");
const jsonwebtoken = require("jsonwebtoken");
module.exports = function verifyJWT(token) {
  return jsonwebtoken.verify(token, getEnv("JWT_SECRET"));
};
