const ErrorCodes = require("../helpers/errors");
const getEnv = require("../helpers/getEnv");
//@ts-check
const { verifyJWT } = require("../helpers/JWT");
const AuthMiddleWare = function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    verifyJWT(token);
    return next();
  } catch (e) {
    if (getEnv("NODE_ENV") === "production")
      return res
        .status(403)
        .json({ message: "error", errorCode: ErrorCodes.AUTH_MIDDLE_FAIL });

    return res.status(403).json({
      message: "error",
      errorCode: ErrorCodes.AUTH_MIDDLE_FAIL,
      error: e.toString(),
    });
  }
};
module.exports = AuthMiddleWare;
